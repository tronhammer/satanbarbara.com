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
					"width": "100%"
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
						"date": month+"-"+(date<10?"0"+date:date)+"-"+year
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
        var dayOfMonth = new Date(date).getDate() - 1;
        var row = parseInt( (dayOfMonth<7?dayOfMonth:dayOfMonth+month.prePos) / 7);
        var col = (dayOfMonth<7?dayOfMonth+1:dayOfMonth+month.prePos) % 7;
        var day = $scope.month.weeks[row][col];
        var $ele = $(".sb-calendar-tile[data-date='"+date+"']");
        
        day.number = eventIds.length;
        month.events[date] = day.events = eventIds.map(function(id){
          return events[ id ];
        });
      }

      $scope.$apply();
    });

		$scope.month = $scope.buildCalendarData();
	}]);

	module.directive("resizeListener", function($rootScope) {
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
				"app": {
					"background": "rgba(0,0,0,1);"
				},
				"calendar":{
				}
			}
		 };
		
		return data;
	}); 


  module.factory("$rest", ["$rootScope", function($rootScope) {
    return {
      "mode": "fixture",
      "modes": {
        "fixture": {
          "uri": "fixtures/",
          "buildUri": function(action){
            return this.uri + action+".json"
          }
        },
        "ajax": {
          "uri": "http://api.tronnet.me/",
          "buildUri": function(action){
            return this.uri;
          }
        }
      },
      "getEventData": function(data){
        var mode = this.modes[ this.mode ];
        $.ajax({
          "url": mode.buildUri("getEvents"),
          "dataType": "json",
          "type": "GET",
          "data": data
        }).success(function(response){
          $rootScope.$broadcast("gotEventData", response.data);
        }).fail(function(){
          console.log("double wat");
        });
      }
    };

  }]);
})();
