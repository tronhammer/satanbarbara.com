;(function(module){
	"use strict";

	module.factory("$Venue", ["$rootScope", function($rootScope) {
		var Venue = function(data){
			$.extend(this, {
				"id": null,
				"associations": {},
				"persistent": false,
				"data": {},
				"cache": {}
			});

			this.set(data);
		};

		$.extend(Venue.prototype, {
			"target": "Venue",
			"key": "venues",

			"attrs": {
                "city": {
                    "description": "",
                    "generator": "user",
                    "max": 90,
                    "required": "True",
                    "label": "City",
                    "type": "string",
                    "placeholder": "Satan Barbara",
                    "name": "city"
                },
                "archived": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Archived",
                    "placeholder": "0",
                    "type": "boolean",
                    "name": "archived"
                },
                "slogan": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 90,
                    "label": "Slogan",
                    "type": "string",
                    "placeholder": "Fuck it",
                    "name": "slogan"
                },
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 4000,
                    "label": "Description",
                    "type": "string",
                    "placeholder": "Where you go to get your freak on.",
                    "name": "description"
                },
                "zip": {
                    "description": "",
                    "generator": "user",
                    "min": 5,
                    "max": 12,
                    "required": "True",
                    "label": "Postal Code",
                    "type": "string",
                    "placeholder": "93101",
                    "name": "zip"
                },
                "created": {
                    "name": "created",
                    "generator": "db",
                    "type": "timestamp",
                    "label": "Created",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "description": "Time when entry was made."
                },
                "deleted": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Deleted",
                    "placeholder": "0",
                    "type": "boolean",
                    "name": "deleted"
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
                "uri": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 255,
                    "label": "Website",
                    "type": "string",
                    "placeholder": "http://",
                    "name": "uri"
                },
                "state": {
                    "description": "",
                    "generator": "user",
                    "max": 2,
                    "required": "True",
                    "label": "State",
                    "type": "string",
                    "placeholder": "CA",
                    "name": "state"
                },
                "last_modified": {
                    "description": "",
                    "generator": "system",
                    "default": "",
                    "restricted": "True",
                    "label": "Last modified",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "type": "timestamp",
                    "name": "last_modified"
                },
                "address": {
                    "description": "",
                    "generator": "user",
                    "max": 255,
                    "required": "True",
                    "label": "Address",
                    "type": "string",
                    "placeholder": "666 Hell-yeah",
                    "name": "address"
                },
                "capacity": {
                    "name": "capacity",
                    "generator": "user",
                    "type": "integer",
                    "label": "Capacity",
                    "placeholder": "400",
                    "description": "400"
                },
                "id": {
                    "description": "",
                    "generator": "db",
                    "incremented": "True",
                    "label": "Unique ID",
                    "unique": "True",
                    "type": "id",
                    "name": "id"
                },
                "name": {
                    "description": "",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 255,
                    "required": "True",
                    "label": "Name",
                    "type": "string",
                    "placeholder": "CrowdedCoffin",
                    "name": "name"
                }
            },

			"required": [
			
					"city"
			
					, "zip"
			
					, "state"
			
					, "address"
			
					, "name"
			
			],

			"userSettable": [
			
					"city"
			
					, "slogan"
			
					, "description"
			
					, "zip"
			
					, "requirements"
			
					, "uri"
			
					, "state"
			
					, "address"
			
					, "capacity"
			
					, "name"
			
			],

			"userVisible": [
			
					"city"
			
					, "slogan"
			
					, "description"
			
					, "zip"
			
					, "created"
			
					, "requirements"
			
					, "uri"
			
					, "state"
			
					, "address"
			
					, "capacity"
			
					, "id"
			
					, "name"
			
			],

			"junctions": {
        "venueOwner": "Account",
        "venueTag": "Descriptor",
        "venueCreator": "Account"
    },

			"set": function(data){
				var _this = this;
				if (!data){
					return;
				}
				
				if (data.id){
					this.id = data.id;
					delete data.id;
				}

				if (data.assocs){
					this["associations"] = data.assocs;
					delete data.assocs;
				}
				
				console.log("Calling setter for Venue")

				$.each(data, function(key, val){
					if (_this.userSettable.indexOf( key ) !== -1){
						_this.data[ key ] = val;
					}
				});
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

		return Venue;
	}]);


	module.service("VenueController", ["$Venue", "$rootScope", "$rest", function($Venue, $rootScope, $rest) {

		/**
		 * For debugging purposes only, remove in production.
		 * @type {[type]}
		 */
		window._VenueController = this;

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
				console.log("saving Venue object");
				var data = self.data;

				data.target = "Venue";

				$rest.create(data);
			},
			"load": function(){
		        $rest.getData({"target": "Venue", "assocs": 1}, [function(data, identifier){
		        	if (identifier == "loadVenueObjects" && data.venues){
		        		for(var id in data.venues.all){
			        		this.objects[id] = this.factory(data.venues.all[ id ]);
		        		}

		        		this.sorts = data.venues.sorts;

		        		$rootScope.$broadcast("loadedNewVenueObjects", this);
		        	}
		        	console.log("will with work");
		        }, "loadVenueObjects", this]);
			},

				"venueOwner": function(self, Account){
					$rest.create({
						"target": "ObjectAssociations",
						"associations": {
							"venueOwner": {
								"from": {
									"target": "Venue",
									"id": self.get("id")
								},
								"to": {
									"target": "Account",
									"id": Account.get("id")
								}
							}
						}
					});
				},
				"venueTag": function(self, Descriptor){
					$rest.create({
						"target": "ObjectAssociations",
						"associations": {
							"venueTag": {
								"from": {
									"target": "Venue",
									"id": self.get("id")
								},
								"to": {
									"target": "Descriptor",
									"id": Descriptor.get("id")
								}
							}
						}
					});
				},
				"venueCreator": function(self, Account){
					$rest.create({
						"target": "ObjectAssociations",
						"associations": {
							"venueCreator": {
								"from": {
									"target": "Venue",
									"id": self.get("id")
								},
								"to": {
									"target": "Account",
									"id": Account.get("id")
								}
							}
						}
					});
				},

			"factory": function(data){
				console.log("Creating Venue object with controller factory!");
				var Venue;
				if (data && data.id && this.objects[ data.id ]){
					Venue = this.objects[ data.id ];
				} else {
					Venue = new $Venue(data);

					$.extend(Venue, {
							"venueOwner": this.wrapper(this.venueOwner),
							"venueTag": this.wrapper(this.venueTag),
							"venueCreator": this.wrapper(this.venueCreator),
						"save": this.wrapper(this.save)
					});

					if (data && data.id){
						this.objects[ data.id ] = Venue;
					}
				}

				return Venue;
			},
		});
	}]);
})(window.SB.module);