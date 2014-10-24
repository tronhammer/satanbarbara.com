(function(module){
	"use strict";

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

	module.controller("CalendarController", ["$scope", "$data", "ObjectsService", function($scope, $data, ObjectsService) {
		$scope.months = {};
		$scope.buildCalendarData = function(relDate){

			/**
			* Default to today if relDate == undefined
			* @type {[type]}
			*/
			relDate = moment(relDate)	;
			var startDate = moment( (relDate.month()+1)+"/1/"+relDate.year());

			var	builtMonth = {
				"weeks": [],
				"days": {},
				"prePos": 0,
				"date": startDate
			}, 
				weeks=builtMonth.weeks,
				days=builtMonth.days,
				month = (startDate.month()+1),
				year = startDate.year(),
				fullDate = startDate.format("L"),
				i=0,prePos,rowPos,day;

			if ($scope.months[fullDate]){
				return $scope.months[fullDate];
			}

			/**
			* Does not rely on i==0, instead relies on break;
			*/
			while (++i){
				var key = month+"/"+i+"/"+year,
				  day = moment( key	),
		          expandedKey = day.format("L");

		        // console.log("Date for key \""+key+"\" [\""+expandedKey+"\"]", day.toString());

				/**
				 * Weird bug with js Date where certain months will process 31"st day, even if they 
				 * don"t have one, but then provide the first day of the next month.
				 */
				if (day != "Invalid Date" && day.month()+1 == month){
					var date = day.date();

					/**
					 * Plus one because js date starts week on Mondays, our calendar will start on Sunday.
					 */
					var weekPos = day.day() + 1;
					
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

					days[expandedKey] = {
						"title": date,
						"number": 0,
						"description": "",
						"dist": {
							"x": (Math.random()*200 + 300) * [1,-1][ parseInt((Math.random()*2))%2 ],
							"y": Math.random()*200 + 300 * [1,-1][ parseInt((Math.random()*2))%2 ],
							"z": Math.random()* 1.5 + 0.5
						},
						"date": expandedKey
					};

					weeks[rowPos][ (prePos+i)<=7? prePos+i-1 : weekPos-1 ] = days[expandedKey];

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

			$scope.months[year+"-"+month+"-01"] = builtMonth;

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
			event.currentScope.setupCalendarEvents();

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

		$scope.$on("loadedNewEventObjects", function(){
			$scope.setupCalendarEvents();
		});

		$scope.setupCalendarEvents = function(){
			var eventsController = ObjectsService.controllers.Event,
				events = eventsController.objects,
				orderByDate = eventsController.sorts.date,
				month = $scope.month,
				monthId = moment(month.date).month();

			$scope.events = eventsController.objects;
			month.events = {};

			window._month = month;
			/**
			 * prePos is used to determine the first row buffer offset
			 */
			for(var date in orderByDate){
				var cleanDate = moment(date),
					fullDate = cleanDate.format("L");

				if (cleanDate.month() != monthId){
					continue;
				}

				var eventIds = orderByDate[date],
					day =  month.days[fullDate];

				day.number = eventIds.length;

				month.events[fullDate] = day.events = eventIds.map(function(id){
					var Obj = events[ id ];
					var assocs = ObjectsService.buildAssocs(Obj);
					return Obj;
				});

				month.events[fullDate].prettyDate = day.prettyDate = cleanDate.format("ll");
			}

			// window._CalController = $scope;

			$scope.$apply();
		};

		$scope.month = $scope.buildCalendarData();
	}]);

	module.controller("CreateEventController", ["$scope", "$data", "ObjectsService", function($scope, $data, ObjectsService, $Event, $Venue, $Band){
		$scope.bands = [];

		$scope.create = function(){
			var eventData = {},
				venueData = {};

			for (var fieldName in $scope.eventDefinitions){
				if (fieldName.substr(0,1) != "$"){
					var $field = $("[name='"+fieldName+"']");
					if ($field.length){
						eventData[fieldName] = $("[name='"+fieldName+"']").val();
					}
				}
			}

			for (var fieldName in $scope.venueDefinitions){
				if (fieldName.substr(0,1) != "$"){
					var $field = $("[name='"+fieldName+"']");
					if ($field.length){
						venueData[fieldName] = $("[name='"+fieldName+"']").val();
					}
				}
			}

			eventData["start_time"] = eventData["date"]+" "+eventData["start_time"];
			eventData["end_time"] = eventData["date"]+" "+eventData["end_time"];

			$scope.Event.set( eventData );
			$scope.Venue.set( venueData );

			$scope.creating = true;

			$scope.Event.save();
			$scope.Venue.save();

			console.log("Time to create this sucker");
		}

		window._OS = ObjectsService;

		$scope.creating = false;
		$scope.safeToBind = {
			"eventVenue": {
				"eventIsCreated": false,
				"venueIsCreated": false
			},
			"eventBand":{
				"eventIsCreated": false,
				"bandIsCreated": false
			}
		}

		$scope.$on("createdEvent", function(e, data){
			$scope.Event.set(data);
			if ($scope.creating && $scope.safeToBind["eventVenue"]){
				$scope.safeToBind["eventVenue"]["eventIsCreated"] = true;
				if ($scope.safeToBind["eventVenue"]["venueIsCreated"]){
					delete $scope.safeToBind["eventVenue"];
					$scope.Event.eventVenue( $scope.Venue );
				}

				if ($scope.bands.length){
					$.each($scope.bands, function(){
						$scope.Event.eventBand( this );
					})
				}
			}
			console.log("Created that event!");
		});

		$scope.$on("createdVenue", function(e, data){
			$scope.Venue.set(data);
			if ($scope.creating && $scope.safeToBind["eventVenue"]){
				$scope.safeToBind["eventVenue"]["venueIsCreated"] = true;
				if ($scope.safeToBind["eventVenue"]["eventIsCreated"]){
					$scope.Event.eventVenue( $scope.Venue );
					delete $scope.safeToBind["eventVenue"];
				}
			}
			console.log("Created that venue!");
		});

		$scope.$on("createdBand", function(e, data){
			$scope.bands.push( ObjectsService.controllers["Band"].factory(data) );
			console.log("Created that band!");
		});

		$scope.Event = ObjectsService.controllers["Event"].factory();
		$scope.Venue = ObjectsService.controllers["Venue"].factory();

		$scope.eventDefinitions = $scope.Event.getSettables();
		$scope.venueDefinitions = $scope.Venue.getSettables();
		$scope.acts = {
			"type": "string",
			"name": "acts",
			"label": "Acts",
			"placeholder": "Death, Entombed, Edge Of Sanity",
			"required": true
		};
	}]);


	module.directive("createEventListener", ["$rootScope", "ObjectsService", function($rootScope, ObjectsService) {
		return {
			"link": function($scope, ele, attrs){
				$(ele).bind("click", function(){
					// createEvent.hide();
				});

				$(ele).delegate("input[name='acts']", "keyup", function(){
					var bands = $(this).val()

					if (bands.substr(-1) == ","){
						var existingBandsList = $(this).data("acts") || [],
							bandsList = bands.split(","),
							lastBand = bandsList[ bandsList.length - 2 ].trim();

						if (existingBandsList.indexOf(lastBand) == -1){
							existingBandsList.push( lastBand );
							$(this).data("acts", existingBandsList);

							var Band = ObjectsService.controllers["Band"].factory({
								"name": lastBand
							});
							Band.save();
						}						
					}
				})

				$(ele).delegate("input[name='acts']", "blur", function(){
					var existingBandsList = $(this).data("acts") || [],
						bandsList = $(this).val().split(","),
						lastBand = bandsList[ bandsList.length - 1 ].trim();

					if (lastBand.length && existingBandsList.indexOf( lastBand ) == -1){
							existingBandsList.push( lastBand );
							$(this).data("acts", existingBandsList);

							var Band = ObjectsService.controllers["Band"].factory({
								"name": lastBand
							});
							Band.save();
					}

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


	module.directive("loadCalendarData", ["$rootScope", "ObjectsService", function($rootScope, ObjectsService) {
		return {
			"link": function($scope, ele, attrs){
				ObjectsService.controllers["Event"].load();
				ObjectsService.controllers["Venue"].load();
				ObjectsService.controllers["Band"].load();
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
				"app":	"background: rgba(0,0,0,1) url('media/images/nightmares-made-flesh.jpg') no-repeat; background-size: 100% 100%;",
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
					"uri": "http://api.satanbarbara.com/",
					"buildUri": function(data){
						return this.uri+"?action="+data.action+ (data.target ? "&target="+data.target : "");
					}
				}
			},
			"createListenerToken": function(ns){
				return (ns+"-"||"") + (new Date()).getTime();
			},

			/**
			 * One time listeners for callback wrappers for REST calls.
			 * 
			 * @param	{Function} callback [description]
			 * @param	{[type]}	 data		 [description]
			 * @param	{[type]}	 scope		[description]
			 * @return {[type]}						[description]
			 */
			"listener": function(callback, data, scope){
				var token = this.createListenerToken(),
					destroyListener;

				destroyListener = $rootScope.$on( token, function(e, response){
					destroyListener();
					callback.call(scope||this, response, data);
				});

				return token;
			},
			"getData": function(data, listener){
				var mode = this.modes[ this.mode ],
					target = data["target"],
					token = null;

				delete data["target"];

				if (listener){
					if (!(listener instanceof Array)){
						listener = [listener];
					}

					token = this.listener.apply(this, listener);
				}

				$.ajax({
					"url": mode.buildUri({
						"action": "Get",
						"target": target
					}),
					"dataType": "json",
					"type": "GET",
					"data": data
				}).success(function(response){
					$rootScope.$broadcast("got"+target+"Data", response.data);
					if (token){
						$rootScope.$broadcast(token, response.data);
					}
				}).fail(function(){
					console.log("double wat");
				});
			},
			"getObjectSchema": function(data){
				var mode = this.modes[ this.mode ];
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
			"create": function(data, listener){
				var mode = this.modes[ this.mode ],
					target = data["target"];

				data["action"] = "Create";

				// delete data["target"];

				$.ajax({
					"url": mode.uri,
					"dataType": "json",
					"type": "POST",
					"data": data
				}).success(function(response){
					data.id = response.data.saved;
					$rootScope.$broadcast("created"+target, data);
				}).fail(function(){
					console.log("double wat");
				});
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
					* the first being a 0	in the event it is a single digit numeric.
					* 
					* @param	{[type]} char [description]
					* @return {[type]}			[description]
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
					* the first being a 0	in the event it is a single digit numeric.
					* 
					* @param	{[type]} char [description]
					* @return {[type]}			[description]
					*/
					var escn = function(char, isHour){
						if (isHour && char > 12){
							char -= 12;
						}
						return (char+"").length == 1 ? "0"+char : char;
					}

					scope.now = escn(today.getHours(), 1)+":"+escn(today.getMinutes())+" "+( today.getHours() > 12 ? "pm" : "am");

					$(ele).find(".sb-field-input").bind("blur", function(){
						var time = $(this).val();
						var datetime =	today.getFullYear()+"-"+escn(today.getMonth())+"-"+escn(today.getDate())+" ";
						if (new Date(datetime+time) == "Invalid Date"){
							$(this).addClass("sb-field-not-valid");
						}
					}).bind("focus", function(){
						$(this).removeClass("sb-field-not-valid")
					});
			}
		};
	});

	// module.factory("$win", ["$rootScope", function($rootScope){
	//	 var newObj = function(name){
	//		 this.attrs = {
	//			 "id": "Event",
	//			 "name": name
	//		 };
	//	 };

	//	 newObj.prototype.nameGetter = function(){
	//		 return this.attrs.name;
	//	 };

	//	 return newObj;
	// }]);

	// module.service("winService", ["$win", function($win){
	//	 this.name = "The Win Service";

	//	 this.objects = {};

	//	 this.wrapper = function(callback){
	//		 return (function(winService){
	//			 return function(){
	//				 callback.apply(winService);
	//			 };
	//		 }).call(this, this);
	//	 }

	//	 this.addObject = function(name){
	//		 var $obj = new $win(name);
	//		 this.objects[name] = $obj;

	//		 $.extend($obj, {
	//			 "getTheName": this.wrapper(this.getTheName)
	//		 });

	//		 $obj.getTheName();

	//		 return $obj;
	//	 }

	//	 this.getTheName = function(){
	//		 return this.name;
	//	 }
	// }]);
})(window.SB.module);