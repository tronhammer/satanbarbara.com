(function(){
	"use strict";
	var module = angular.module("app", ["onsen"]);

	module.controller("AppController", ["$scope", "$data", function($scope, $data) {
		$scope.styles = $data.styles;
		$scope.profile = window.innerWidth < 600 ? "small" : "large";
		$scope.profiles = {
			"large": {
				"calendar": {
					"width": "60%"
				},
				"infobox": {
					"width": "40%"
				}
			},
			"small": {
				"calendar": {
					"width": "100%"
				},
				"infobox": {
					"width": "100%",
				}
			}
		};

    $scope.animate = function(time){
        requestAnimationFrame( $scope.animate );
        TWEEN.update( time );
    };

		$scope.$on("resize", function(){
			$scope.profile =	window.innerWidth < 600 ? "small" : "large";
			$scope.$apply();
		});

    $scope.$on("gotEventData", function(e, data){
      $data.events = data.events;
    });

    $scope.animate();
	}]);

	module.controller("CalendarController", ["$scope", "$data", function($scope, $data) {
    $scope.months = {};
		$scope.buildCalendarData = function(relDate){
			var	builtMonth = {
        "weeks": [],
        "days": {},
        "prePos": 0
      }, weeks=builtMonth.weeks,days=builtMonth.days,day,i=0,prePos,rowPos;

			relDate = relDate || new Date();

			var month = (relDate.getMonth()+1),
				year = relDate.getFullYear();

      if ($scope.months[month+"-"+i+"-"+year]){
        return $scope.months[month+"-"+i+"-"+year];
      }

			while (++i){
        var key = month+"-"+i+"-"+year;
				day = new Date( key	);

				/**
				 * Weird bug with js Date where certain months will process 31"st day, even if they 
				 * don"t have one, but then provide the first day of the next month.
				 */
				if (day != "Invalid Date" && day.getMonth()+1 == month){
					var date = day.getDate();

					/**
					 * Plus one because js date starts week on Mondays, our calendar will start on Sunday.
					 */
					var weekPos = day.getDay() + 1;
					
					if (i == 1){
						weeks[i-1] = [];
						builtMonth.prePos = prePos = weekPos-1;
						for(var ii=1;ii<=prePos;ii++){
							weeks[i-1][ii-1] = {
								"title": "",
								"number": 0,
								"description": "",
								"dist": {
									"x": Math.random()*200 + 300 * [1,-1][ parseInt((Math.random()*2))%2 ],
									"y": Math.random()*200 + 300 * [1,-1][ parseInt((Math.random()*2))%2 ],
                  "z": Math.random() * 1.5 + 0.5
								}
							};
						}
					}

					rowPos = parseInt(((prePos-1)+date) / 7) ;

					if (!weeks[rowPos]){
						weeks[rowPos] = [];
					}

          days[key] = {
						"title": date,
						"number": 0,
						"description": "",
						"dist": {
							"x": (Math.random()*200 + 300) * [1,-1][ parseInt((Math.random()*2))%2 ],
							"y": Math.random()*200 + 300 * [1,-1][ parseInt((Math.random()*2))%2 ],
							"z": Math.random()* 1.5 + 0.5
						},
						"date": year+"-"+(date<10?"0"+date:date)+"-"+month
					};

          weeks[rowPos][ (prePos+i)<=7? prePos+i-1 : weekPos-1 ] = days[key];

				} else {
					var pos = weekPos;

					for (var iii=pos+1;iii<=7;iii++){
						weeks[rowPos][iii-1] = {
							"title": "",
							"number": 0,
							"description": "",
							"dist": {
								"x": Math.random()*200 + 300 * [1,-1][ parseInt((Math.random()*2))%2 ],
								"y": Math.random()*200 + 300 * [1,-1][ parseInt((Math.random()*2))%2 ],
								"z": Math.random() * 1.5 + 0.5
							}
						};
					}
					break;
				}				 
			}

      $scope.months[month+"-"+i+"-"+year] = builtMonth;

			return builtMonth;
		}

    $scope.showDetail = function(dateKey){
      var $tile = $(".sb-calendar-tile[data-date='"+dateKey+"']");
      var style = {
        "padding": 40
      }
      
      if ($tile.hasClass("animating") || !dateKey){
        return;
      }

      $tile.addClass("animating");

      var tweenData = $tile.data("tweenData");
      if (!tweenData || !tweenData.clickShrinkGrow) {
        $tile.data("tweenData", tweenData = $.extend( tweenData, {
          "clickShrinkGrow": {
            "from": {
              "left": 0, 
              "top": 0,
              "height": $tile.height(),
              "width": $tile.width(),
              "opacityOn": 0,
              "opacityOff": 1
            },
            "to": {
              "left": ($tile.offset().left - style.padding) *-1, 
              "top": ($tile.offset().top - style.padding) *-1,
              "height": window.innerHeight - (style.padding*2),
              "width": window.innerWidth - (style.padding*2),
              "opacityOn": 1,
              "opacityOff": 0
            }
          }
        }));
      }

      if ($tile.hasClass("expanded")){
        var tweeningObjects = new TWEEN.Tween($.extend({}, tweenData.clickShrinkGrow.to))
          .to($.extend({}, tweenData.clickShrinkGrow.from), 3000);
        
        $tile.addClass("shrinking")
          .removeClass("expanded")
          .css({"z-index": ""});
      } else {
        var tweeningObjects = new TWEEN.Tween($.extend({}, tweenData.clickShrinkGrow.from))
          .to($.extend({}, tweenData.clickShrinkGrow.to), 3000);

        $tile.addClass("expanding")
          .removeClass("shrunk")
          .css({"z-index": "10"});
      }

      tweeningObjects.easing( TWEEN.Easing.Exponential.InOut );
      tweeningObjects.onUpdate(function(){
        $tile.css({
          "left": this.left,
          "top": this.top,
          "height": this.height,
          "width": this.width
        });

        $tile.find(".symbol").css({"opacity": this.opacityOff });
        $tile.find(".sb-calendar-day-events").css({"opacity": this.opacityOn });
      });

      tweeningObjects.onComplete(function(){
        $tile.removeClass("animating");

        if ($tile.hasClass("expanding")){
          $tile.addClass("expanded");
          $tile.removeClass("expanding");
        } else {
          $tile.addClass("shrunk");
          $tile.removeClass("shrinking");
        }
      });

      tweeningObjects.start();
    }

		$scope.$on("monthUpdated", function(event, month){
			event.currentScope.month = month;
			event.currentScope.$apply();

      event.currentScope.$broadcast("animateCalendar");

		});

		$scope.$on("updateMonth", function(event, date){
			event.currentScope.$broadcast("monthUpdated", event.currentScope.buildCalendarData(date) );
		});

    $scope.$on("animateInfobar", function(event){
      var $infobar = $(".sb-calendar-sidebar-day-events");
      var tweeningObjects = new TWEEN.Tween({
        "opacity": 0,
        "height": 0
      }).to({
        "opacity": 1,
        "height": 560
      }, 3000);

      tweeningObjects.easing( TWEEN.Easing.Back.Out );
      tweeningObjects.onUpdate(function(){
        $infobar.css({
          "opacity": this.opacity,
          "height": this.height
        });
      });

      tweeningObjects.start();
    });

    $scope.$on("animateCalendar", function(event){
        var $tiles = $(".sb-calendar-tile");
        $tiles.each(function(){
          var $tile = this;
          var tweeningObjects = new TWEEN.Tween({
            // "spin": 300,
            "left": parseFloat($tile.style.left), 
            "top": parseFloat($tile.style.top),
            "scale": parseFloat($tile.style.transform.substr(6))
          }).to({
            // "spin": 0,
            "left": 0, 
            "top": 0,
            "scale": 1
          }, 3000);

          tweeningObjects.easing( TWEEN.Easing.Exponential.InOut );
          tweeningObjects.onUpdate(function(){
            $tile.style.left = this.left+"px";
            $tile.style.top = this.top+"px";
            $tile.style.transform = "scale("+(this.scale)+")"; //" skew("+this.spin+"deg, "+this.spin+"deg)";
          });

          tweeningObjects.start();
        });
    });

    $scope.$on("gotEventData", function(e, data){
      $scope.events = data.events;
      
      var events = $scope.events.all,
        orderByDate = $scope.events.sorts.date,
        month = $scope.month;

      month.events = {};

      /**
       * prePos is used to determine the first row buffer offset
       */
      for(var date in orderByDate){
        var eventIds = orderByDate[date]
        var dayOfMonth = new Date(date +" 00:01:00").getDate() - 1;
        var row = parseInt( (dayOfMonth<7?dayOfMonth:dayOfMonth+month.prePos) / 7);
        var col = (dayOfMonth<7?dayOfMonth+1:dayOfMonth+month.prePos) % 7 || 6; /** 7%7=0; therefor 7 = 6 */
        var day = $scope.month.weeks[row][col];
        
        day.number = eventIds.length;
        month.events[date] = day.events = eventIds.map(function(id){
          return events[ id ];
        });
      }

      $scope.$apply();
    });

		$scope.month = $scope.buildCalendarData();
	}]);

  module.controller("CreateEventController", ["$scope", "$data", "$rest", function($scope, $data, $rest){
    $scope.create = function(){
      var eventData = {},
        venueData = {},
        bands = [];

      for (var fieldName in $scope.eventDefinitions){
        if (fieldName.substr(0,1) != "$"){
          eventData[fieldName] = $("[name='"+fieldName+"']").val();
        }
      }

      for (var fieldName in $scope.venueDefinitions){
        if (fieldName.substr(0,1) != "$"){
          venueData[fieldName] = $("[name='"+fieldName+"']").val();
        }
      }

      bands = $("[name='bandnames']").val().split(",");

      

    }

    $scope.$on("gotObjectSchema", function(e, data){
      var eventAttrs = {},
        venueAttrs = {},
        bandAttrs = {};

      for (var attrName in data.schema.Event){
        var attr = data.schema.Event[attrName];
        if (attr.generator == "user"){
          eventAttrs[attrName] = attr;
        }
      }

      for (var attrName in data.schema.Venue){
        var attr = data.schema.Venue[attrName];
        if (attr.generator == "user"){
          venueAttrs[attrName] = attr;
        }
      }

      $scope.eventDefinitions = eventAttrs;
      $scope.venueDefinitions = venueAttrs;
      $scope.bandNames = {
        "type": "string",
        "name": "bandnames",
        "label": "Bands",
        "placeholder": "Death, Entombed, Edge Of Sanity",
        "required": true
      };
    });

    $rest.getObjectSchema({"type": "Event"})
  }]);

  module.directive("createEventListener", ["$rootScope", function($rootScope) {
    return {
      "link": function($scope, ele, attrs){
        $(ele).bind("click", function(){
            // createEvent.hide();
          });
      }
    }   
  }]);

	module.directive("globalListener", function($rootScope) {
		return {
			"restrict": "A", // attribute
			"scope": {
				// "moveRight": "&", // bind to parent method
				// "moveLeft": "&"
			},
			"link": function(scope, elm, attrs) {
				$(window).bind("resize", function(){
					$rootScope.$broadcast("resize");
				});

        $(window).bind("keyup", function(event){
          if (event.keyCode == 27){
            createEvent.hide();
          }
        });
			}
		};
	});


  module.directive("loadCalendarData", ["$rootScope", "$rest", function($rootScope, $rest) {
    return {
      "link": function($scope, ele, attrs){
        $rest.getEventData();
      }
    }   
  }]);

  module.directive("animateCalendar", ["$rootScope", function($rootScope) {
    var rowsCreated = 0;

    return {
      "link": function($scope, ele, attrs){
        $scope.$evalAsync(function($scope, ele) {
          if (++rowsCreated == $scope.month.weeks.length){
            $rootScope.$broadcast("animateCalendar");
          }
        });
      }
    }   
  }]);

	module.directive("monthUpdateListener", ["$rootScope", function($rootScope) {
		return {
			"restrict": "A", // attribute
			"scope": {
				// "moveRight": "&", // bind to parent method
				// "moveLeft": "&"
			},
			"link": function(scope, elm, attrs) {
				elm.bind("change", function(){
					$rootScope.$broadcast("updateMonth", new Date($(this).val()));
				});
			}
		};
	}]);

	module.factory("$data", function() {
		var data = {
			"styles": {
				"app":  "background: rgba(0,0,0,1) url('media/images/nightmares-made-flesh.jpg') no-repeat; background-size: 100% 100%;",
				"calendar":{
				}
			}
		 };
		
		return data;
	}); 

  module.directive("animateInfobar", ["$rootScope", function($rootScope) {

    return {
      "link": function($scope, ele, attrs){
        $rootScope.$broadcast("animateInfobar");
      }
    }   
  }]);


  module.factory("$rest", ["$rootScope", function($rootScope) {
    return {
      "mode": "ajax",
      "modes": {
        "fixture": {
          "uri": "fixtures/",
          "buildUri": function(data){
            return this.uri + data.action + data.target+ (data.type&&"Type"+data.type||"")+".json"
          }
        },
        "ajax": {
          "uri": "http://localhost/satanbarbara.com/api/",
          "buildUri": function(data){
            return this.uri+"?action="+data.action+"&target="+data.target;
          }
        }
      },
      "getEventData": function(data){
        var mode = this.modes[ this.mode ];
        $.ajax({
          "url": mode.buildUri({
            "action": "Get",
            "target": "Event"
          }),
          "dataType": "json",
          "type": "GET",
          "data": data
        }).success(function(response){
          $rootScope.$broadcast("gotEventData", response.data);
        }).fail(function(){
          console.log("double wat");
        });
      },
      "getObjectSchema": function(data){
        var mode = this.modes["fixture"];
        $.ajax({
          "url": mode.buildUri({
            "action": "Get",
            "target": "ObjectSchema"
          }),
          "dataType": "json",
          "type": "GET",
          "data": data
        }).success(function(response){
          $rootScope.$broadcast("gotObjectSchema", response.data);
        }).fail(function(){
          console.log("double wat");
        });
      },
      "createEvent": function(data){
        $.ajax({
          "type": "POST", 
          "dataType": "json", 
          "url": "http://localhost/satanbarbara.com/api/", 
          "data": {
            "action": "Create",
            "target": "Event",
            "creator_id": 3,
            "type_id": 2,
            "title": "all the wins...!", 
            "subtitle": "For maor purposes", 
            "description": "It could be really cool for a test!", 
            "location": "1234 sterrat lane, santa barbara, CA 93101",
            "date_text": "October 6th, 2014 @ 7:30pm",
            "date": "2014-10-06",
            "start_time": "2014-10-06 19:30:00",
            "end_time": "2014-10-06 1:00:00",
            "ages": "21",
            "venue": "The Crowded Coffin",
            "venue_id": 1,
            "venue_type_id": 1,
            "price": "$18.50",
            "requirements": "Nothing",
            "genre_id": 2,
            "map_uri": "https://maps.google.com/",
            "ticket_uri": "not sure",
            "promocode": "",
            "acts": "[1,2,3]", 
            "guests": "[1,2,3]",
            "actstotal": 3,
            "gueststotal": 100
          }
        }).done(function(r){ console.log("done!", arguments); }).fail(function(){ console.log("failed!", arguments); })
      }
    };

  }]);


  /**
   * Testing Template Expanded Directives
   */
  
  module.directive('sbModalExit', function() {
    return {
      "restrict": "E",
      "scope": {
        "hide": "&"
      },
      "templateUrl": "modalExit.tmpl",
      "link": function(scope,ele,attrs){
        $(ele).bind("click", scope.hide).delegate(".sb-modal-close", "click", scope.hide);
      }
    };
  });

  module.directive('sbFieldString', function() {
    return {
      "restrict": "E",
      "scope": {
        "field": "="
      },
      "templateUrl": "fieldString.tmpl"
    };
  });

  module.directive('sbFieldText', function() {
    return {
      "restrict": "E",
      "scope": {
        "field": "="
      },
      "templateUrl": "fieldText.tmpl"
    };
  });

  module.directive('sbFieldDropdown', function() {
    return {
      "restrict": "E",
      "scope": {
        "field": "="
      },
      "templateUrl": "fieldDropdown.tmpl",
      "link": function(scope,ele,attrs){
          scope.selected = function(opt){
            return this.field.default == opt.name ? "selected" : "";
          }
      }
    };
  });

  module.directive('sbFieldDate', function() {
    return {
      "restrict": "E",
      "scope": {
        "field": "="
      },
      "templateUrl": "fieldDate.tmpl",
      "link": function(scope,ele,attrs){
          var today = new Date();

          /**
          * Expands Single Character Numerics so that they always have at least 2 numeric characters,
          * the first being a 0  in the event it is a single digit numeric.
          * 
          * @param  {[type]} char [description]
          * @return {[type]}      [description]
          */
          var escn = function(char){
            return (char+"").length == 1 ? "0"+char : char;
          }

          scope.today = today.getFullYear()+"-"+escn(today.getMonth())+"-"+escn(today.getDate());

          $(ele).find(".sb-field-input").bind("blur", function(){
            if (new Date($(this).val()) == "Invalid Date"){
              $(this).addClass("sb-field-not-valid");
            }
          }).bind("focus", function(){
            $(this).removeClass("sb-field-not-valid")
          });
      }
    };
  });

  module.directive('sbFieldTime', function() {
    return {
      "restrict": "E",
      "scope": {
        "field": "="
      },
      "templateUrl": "fieldTime.tmpl",
      "link": function(scope,ele,attrs){
          var today = new Date();
          
          /**
          * Expands Single Character Numerics so that they always have at least 2 numeric characters,
          * the first being a 0  in the event it is a single digit numeric.
          * 
          * @param  {[type]} char [description]
          * @return {[type]}      [description]
          */
          var escn = function(char){
            return (char+"").length == 1 ? "0"+char : char;
          }

          scope.now = today.getFullYear()+"-"+escn(today.getMonth())+"-"+escn(today.getDate())+" "+escn(today.getHours())+":"+escn(today.getMinutes())+":"+escn(today.getSeconds());

          $(ele).find(".sb-field-input").bind("blur", function(){
            if (new Date($(this).val()) == "Invalid Date"){
              $(this).addClass("sb-field-not-valid");
            }
          }).bind("focus", function(){
            $(this).removeClass("sb-field-not-valid")
          });
      }
    };
  });
})();
