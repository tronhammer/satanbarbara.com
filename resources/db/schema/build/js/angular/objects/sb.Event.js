;(function(module){
	"use strict";

	module.factory("$Event", ["$rootScope", function($rootScope) {
		var Event = function(data){
			$.extend(this, {
				"id": null,
				"persistent": false,
				"data": {},
				"cache": {}
			});

			this.set(data);
		};

		$.extend(Event.prototype, {
			"attrs": {
                "archived": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "type": "boolean",
                    "label": "Archived",
                    "placeholder": "0",
                    "name": "archived"
                },
                "subtitle": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 90,
                    "label": "Subtitle",
                    "type": "string",
                    "placeholder": "B-Y-O-Bible",
                    "name": "subtitle"
                },
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 4000,
                    "label": "Description",
                    "type": "string",
                    "placeholder": "This is gonna be hot!",
                    "name": "description"
                },
                "title": {
                    "description": "",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 255,
                    "required": "True",
                    "label": "Title",
                    "type": "string",
                    "placeholder": "SBCMT Bible Burning",
                    "name": "title"
                },
                "deleted": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "type": "boolean",
                    "label": "Deleted",
                    "placeholder": "0",
                    "name": "deleted"
                },
                "ticket_uri": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 255,
                    "label": "Ticket URL",
                    "type": "string",
                    "placeholder": "http://",
                    "name": "ticket_uri"
                },
                "start_time": {
                    "description": "",
                    "generator": "user",
                    "type": "timestamp",
                    "required": "True",
                    "label": "Start Time",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "start_time"
                },
                "promocode": {
                    "description": "",
                    "generator": "user",
                    "max": 64,
                    "label": "Promocode",
                    "placeholder": "IKICKASSFORTHELORD",
                    "type": "string",
                    "name": "promocode"
                },
                "ages": {
                    "description": "",
                    "generator": "user",
                    "default": "na",
                    "label": "Ages",
                    "type": "option",
                    "options": {
                        "18": {
                            "position": 1,
                            "label": "18+",
                            "type": "string",
                            "description": "",
                            "name": "18"
                        },
                        "all": {
                            "position": 0,
                            "label": "All",
                            "type": "string",
                            "description": "",
                            "name": "all"
                        },
                        "21": {
                            "position": 2,
                            "label": "21+",
                            "type": "string",
                            "description": "",
                            "name": "21"
                        },
                        "na": {
                            "position": 35,
                            "label": "Not Sure",
                            "type": "string",
                            "description": "",
                            "name": "na"
                        }
                    },
                    "name": "ages"
                },
                "created": {
                    "name": "created",
                    "generator": "db",
                    "type": "timestamp",
                    "label": "Created",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "description": "Time when entry was made."
                },
                "price": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "placeholder": "$5",
                    "required": "True",
                    "label": "Event Price",
                    "type": "string",
                    "name": "price"
                },
                "canceled": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "type": "boolean",
                    "label": "Canceled",
                    "placeholder": "0",
                    "name": "canceled"
                },
                "last_modified": {
                    "description": "",
                    "generator": "system",
                    "default": "",
                    "type": "timestamp",
                    "label": "Last modified",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_modified"
                },
                "end_time": {
                    "description": "",
                    "generator": "user",
                    "type": "timestamp",
                    "required": "True",
                    "label": "End Time",
                    "placeholder": "2014-11-25 11:34:00 pm",
                    "name": "end_time"
                },
                "date": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "placeholder": "2014-12-27",
                    "required": "True",
                    "label": "Event Date",
                    "type": "date",
                    "name": "date"
                },
                "requirements": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 4000,
                    "label": "Requirements",
                    "type": "string",
                    "placeholder": "At least 1 bible.",
                    "name": "requirements"
                },
                "flyer_uri": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 255,
                    "label": "Flyer",
                    "type": "string",
                    "placeholder": "http://",
                    "name": "flyer_uri"
                },
                "id": {
                    "description": "",
                    "generator": "db",
                    "incremented": "True",
                    "required": "True",
                    "label": "Unique ID",
                    "unique": "True",
                    "type": "id",
                    "name": "id"
                },
                "date_text": {
                    "description": "2014-11-25",
                    "generator": "system",
                    "max": 35,
                    "label": "Date Full Text",
                    "placeholder": "2014-11-25",
                    "type": "string",
                    "name": "date_text"
                }
            },

			"required": [
			
					"title"
			
					, "start_time"
			
					, "price"
			
					, "end_time"
			
					, "date"
			
			],

			"userSettable": [
			
					"subtitle"
			
					, "description"
			
					, "title"
			
					, "ticket_uri"
			
					, "start_time"
			
					, "promocode"
			
					, "ages"
			
					, "price"
			
					, "end_time"
			
					, "date"
			
					, "requirements"
			
					, "flyer_uri"
			
			],

			"userVisible": [
			
					"archived"
			
					, "subtitle"
			
					, "description"
			
					, "title"
			
					, "deleted"
			
					, "ticket_uri"
			
					, "start_time"
			
					, "promocode"
			
					, "ages"
			
					, "created"
			
					, "price"
			
					, "canceled"
			
					, "last_modified"
			
					, "end_time"
			
					, "date"
			
					, "requirements"
			
					, "flyer_uri"
			
					, "id"
			
					, "date_text"
			
			],

			"junctions": {
        "eventBand": "Band",
        "eventVenue": "Venue",
        "eventCreator": "Account",
        "eventGenre": "Descriptor",
        "eventAttendee": "Account"
    },

			"set": function(data){
				if (!data){
					return;
				}
				
				if (data.id){
					this.id = data.id;
					delete data.id;
				}
				console.log("Calling setter for Event")
				$.extend(this.data, data);
			},
			"get": function(name){
				return name=="id" ? this.id : this.data[name];
			},
			"getSettables": function(){
				if (this.cache.userGenerated){
					return this.cache.userGenerated;
				} else {
					var userGenerated = {};
	
					for (var attrName in this.attrs){
						var attr = this.attrs[attrName];
						if (attr.generator == "user"){
							userGenerated[attrName] = attr;
						}
					}

					return userGenerated;
				}

			}
		});

		return Event;
	}]);


	module.service("EventController", ["$Event", "$rootScope", "$rest", function($Event, $rootScope, $rest) {

		/**
		 * For debugging purposes only, remove in production.
		 * @type {[type]}
		 */
		window._EventController = this;

		$.extend(this, {
			"objects": {},
			"sorts": {},
			"ids": [],
			"wrapper": function(callback){
				var _this = this;
				return function(data){
					callback.call(_this, this, data);
				};
			},
			"save": function(self, data){
				console.log("saving Event object");
				var data = self.data;

				data.target = "Event";

				$rest.create(data);
			},
			"load": function(){
		        $rest.getData("Event", {}, [function(data, identifier){
		        	if (identifier == "loadEvents" && data.events){
		        		for(var id in data.events.all){
			        		this.objects[id] = this.factory(data.events.all[ id ]);
		        		}

		        		this.sorts = data.events.sorts;

		        		$rootScope.$broadcast("loadedNewEvent", this);
		        	}
		        	console.log("will with work");
		        }, "loadEvents", this]);
			},

				"eventBand": function(self, Band){
					$rest.create({
						"target": "eventBand",
						"from": self.get("id"),
						"to": Band.get("id")
					});
				},
				"eventVenue": function(self, Venue){
					$rest.create({
						"target": "eventVenue",
						"from": self.get("id"),
						"to": Venue.get("id")
					});
				},
				"eventCreator": function(self, Account){
					$rest.create({
						"target": "eventCreator",
						"from": self.get("id"),
						"to": Account.get("id")
					});
				},
				"eventGenre": function(self, Descriptor){
					$rest.create({
						"target": "eventGenre",
						"from": self.get("id"),
						"to": Descriptor.get("id")
					});
				},
				"eventAttendee": function(self, Account){
					$rest.create({
						"target": "eventAttendee",
						"from": self.get("id"),
						"to": Account.get("id")
					});
				},

			"factory": function(data){
				console.log("Creating Event object with controller factory!");
				var Event;
				if (data && data.id && this.objects[ data.id ]){
					Event = this.objects[ data.id ];
				} else {
					Event = new $Event(data);

					$.extend(Event, {
							"eventBand": this.wrapper(this.eventBand),
							"eventVenue": this.wrapper(this.eventVenue),
							"eventCreator": this.wrapper(this.eventCreator),
							"eventGenre": this.wrapper(this.eventGenre),
							"eventAttendee": this.wrapper(this.eventAttendee),
						"save": this.wrapper(this.save)
					});
				}

				return Event;
			},
		});
	}]);
})(window.SB.module);