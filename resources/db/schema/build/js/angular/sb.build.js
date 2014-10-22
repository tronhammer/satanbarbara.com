;(function(module){
	"use strict";

	
;(function(module){
	"use strict";

	module.factory("$Descriptor", ["$rootScope", function($rootScope) {
		var Descriptor = function(data){
			$.extend(this, {
				"id": null,
				"persistent": false,
				"data": {},
				"cache": {}
			});

			this.set(data);
		};

		$.extend(Descriptor.prototype, {
			"attrs": {
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
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 4000,
                    "label": "Description",
                    "type": "string",
                    "placeholder": "SO awesome!",
                    "name": "description"
                },
                "created": {
                    "description": "Time when entry was made.",
                    "generator": "db",
                    "type": "timestamp",
                    "required": "True",
                    "label": "Created",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "created"
                },
                "deleted": {
                    "description": "0",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Deleted",
                    "placeholder": "",
                    "type": "boolean",
                    "name": "deleted"
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
                    "unique": "True",
                    "placeholder": "awesome",
                    "name": "name"
                }
            },

			"required": [
			
					"name"
			
			],

			"userSettable": [
			
					"description"
			
					, "name"
			
			],

			"userVisible": [
			
					"description"
			
					, "created"
			
					, "id"
			
					, "name"
			
			],

			"junctions": {
        
    },

			"set": function(data){
				if (!data){
					return;
				}
				
				if (data.id){
					this.id = data.id;
					delete data.id;
				}
				console.log("Calling setter for Descriptor")
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

		return Descriptor;
	}]);


	module.service("DescriptorController", ["$Descriptor", "$rootScope", "$rest", function($Descriptor, $rootScope, $rest) {

		/**
		 * For debugging purposes only, remove in production.
		 * @type {[type]}
		 */
		window._DescriptorController = this;

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
				console.log("saving Descriptor object");
				var data = self.data;

				data.target = "Descriptor";

				$rest.create(data);
			},
			"load": function(){
		        $rest.getData("Descriptor", {}, [function(data, identifier){
		        	if (identifier == "loadDescriptors" && data.descriptors){
		        		for(var id in data.descriptors.all){
			        		this.objects[id] = this.factory(data.descriptors.all[ id ]);
		        		}

		        		this.sorts = data.descriptors.sorts;

		        		$rootScope.$broadcast("loadedNewDescriptor", this);
		        	}
		        	console.log("will with work");
		        }, "loadDescriptors", this]);
			},


			"factory": function(data){
				console.log("Creating Descriptor object with controller factory!");
				var Descriptor;
				if (data && data.id && this.objects[ data.id ]){
					Descriptor = this.objects[ data.id ];
				} else {
					Descriptor = new $Descriptor(data);

					$.extend(Descriptor, {
						"save": this.wrapper(this.save)
					});
				}

				return Descriptor;
			},
		});
	}]);
})(window.SB.module);
;(function(module){
	"use strict";

	module.factory("$Venue", ["$rootScope", function($rootScope) {
		var Venue = function(data){
			$.extend(this, {
				"id": null,
				"persistent": false,
				"data": {},
				"cache": {}
			});

			this.set(data);
		};

		$.extend(Venue.prototype, {
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
				if (!data){
					return;
				}
				
				if (data.id){
					this.id = data.id;
					delete data.id;
				}
				console.log("Calling setter for Venue")
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
		        $rest.getData("Venue", {}, [function(data, identifier){
		        	if (identifier == "loadVenues" && data.venues){
		        		for(var id in data.venues.all){
			        		this.objects[id] = this.factory(data.venues.all[ id ]);
		        		}

		        		this.sorts = data.venues.sorts;

		        		$rootScope.$broadcast("loadedNewVenue", this);
		        	}
		        	console.log("will with work");
		        }, "loadVenues", this]);
			},

				"venueOwner": function(self, Account){
					$rest.create({
						"target": "venueOwner",
						"from": self.get("id"),
						"to": Account.get("id")
					});
				},
				"venueTag": function(self, Descriptor){
					$rest.create({
						"target": "venueTag",
						"from": self.get("id"),
						"to": Descriptor.get("id")
					});
				},
				"venueCreator": function(self, Account){
					$rest.create({
						"target": "venueCreator",
						"from": self.get("id"),
						"to": Account.get("id")
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
				}

				return Venue;
			},
		});
	}]);
})(window.SB.module);
;(function(module){
	"use strict";

	module.factory("$Account", ["$rootScope", function($rootScope) {
		var Account = function(data){
			$.extend(this, {
				"id": null,
				"persistent": false,
				"data": {},
				"cache": {}
			});

			this.set(data);
		};

		$.extend(Account.prototype, {
			"attrs": {
                "username": {
                    "description": "Login name for the Account object.",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 32,
                    "required": "True",
                    "label": "Username",
                    "type": "string",
                    "placeholder": "tronhammer",
                    "name": "username"
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
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 4000,
                    "label": "Description",
                    "type": "string",
                    "placeholder": "I'm freaken tron man! Get with it.",
                    "name": "description"
                },
                "last_active": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "type": "timestamp",
                    "label": "Last active",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_active"
                },
                "created": {
                    "name": "created",
                    "generator": "db",
                    "type": "timestamp",
                    "label": "Created",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "description": "Time when entry was made in the database."
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
                "tagline": {
                    "description": "",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 128,
                    "label": "Tagline",
                    "type": "string",
                    "placeholder": "I've eaten uglier women than you for breakfast.",
                    "name": "tagline"
                },
                "banned": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Banned",
                    "placeholder": "0",
                    "type": "boolean",
                    "name": "banned"
                },
                "activated": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Activated",
                    "placeholder": "1",
                    "type": "boolean",
                    "name": "activated"
                },
                "email": {
                    "description": "",
                    "generator": "user",
                    "min": 9,
                    "default": "",
                    "max": 255,
                    "required": "True",
                    "label": "Email",
                    "type": "string",
                    "placeholder": "tron@tronnet.me",
                    "name": "email"
                },
                "lname": {
                    "description": "",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 128,
                    "label": "Last Name",
                    "type": "string",
                    "placeholder": "Hammer",
                    "name": "lname"
                },
                "privilege_level": {
                    "description": "",
                    "generator": "system",
                    "default": "user",
                    "label": "Privilege Level",
                    "type": "option",
                    "options": {
                        "admin": {
                            "position": 0,
                            "label": "Administrator",
                            "type": "string",
                            "description": "",
                            "name": "admin"
                        },
                        "moderator": {
                            "position": 1,
                            "label": "Moderator",
                            "type": "string",
                            "description": "",
                            "name": "moderator"
                        },
                        "client": {
                            "position": 6,
                            "label": "Client",
                            "type": "string",
                            "description": "",
                            "name": "client"
                        },
                        "user": {
                            "position": 2,
                            "label": "User",
                            "type": "string",
                            "description": "",
                            "name": "user"
                        },
                        "deamon": {
                            "position": 5,
                            "label": "Deamon",
                            "type": "string",
                            "description": "",
                            "name": "deamon"
                        },
                        "root": {
                            "position": 4,
                            "label": "Root",
                            "type": "string",
                            "description": "",
                            "name": "root"
                        },
                        "proxy": {
                            "position": 3,
                            "label": "Not Sure",
                            "type": "string",
                            "description": "",
                            "name": "na"
                        }
                    },
                    "name": "privilege_level"
                },
                "last_activated": {
                    "description": "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Activated",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "type": "timestamp",
                    "name": "last_activated"
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
                "last_login": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "type": "timestamp",
                    "label": "Last logged in",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_login"
                },
                "suspended": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Suspended",
                    "placeholder": "0",
                    "type": "boolean",
                    "name": "suspended"
                },
                "fname": {
                    "description": "",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 128,
                    "required": "True",
                    "label": "First Name",
                    "type": "string",
                    "placeholder": "Tron",
                    "name": "fname"
                },
                "password": {
                    "type": "string",
                    "description": "Case sensitive password for authenticating the Account object.",
                    "generator": "user",
                    "min": 6,
                    "default": "",
                    "max": 128,
                    "required": "True",
                    "label": "Password",
                    "restricted": "True",
                    "placeholder": "666SatanForPrez",
                    "name": "password"
                },
                "nickname": {
                    "description": "",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 64,
                    "label": "Nickname",
                    "type": "string",
                    "placeholder": "TRONHAMBURGER",
                    "name": "nickname"
                },
                "id": {
                    "description": "Exists as a unique identifier for Account objects in both the database and program layer.",
                    "generator": "db",
                    "incremented": "True",
                    "label": "Unique ID",
                    "unique": "True",
                    "type": "id",
                    "name": "id"
                }
            },

			"required": [
			
					"username"
			
					, "email"
			
					, "fname"
			
					, "password"
			
			],

			"userSettable": [
			
					"username"
			
					, "description"
			
					, "tagline"
			
					, "email"
			
					, "lname"
			
					, "fname"
			
					, "password"
			
					, "nickname"
			
			],

			"userVisible": [
			
					"username"
			
					, "description"
			
					, "last_active"
			
					, "created"
			
					, "tagline"
			
					, "email"
			
					, "lname"
			
					, "privilege_level"
			
					, "last_login"
			
					, "fname"
			
					, "nickname"
			
					, "id"
			
			],

			"junctions": {
        
    },

			"set": function(data){
				if (!data){
					return;
				}
				
				if (data.id){
					this.id = data.id;
					delete data.id;
				}
				console.log("Calling setter for Account")
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

		return Account;
	}]);


	module.service("AccountController", ["$Account", "$rootScope", "$rest", function($Account, $rootScope, $rest) {

		/**
		 * For debugging purposes only, remove in production.
		 * @type {[type]}
		 */
		window._AccountController = this;

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
				console.log("saving Account object");
				var data = self.data;

				data.target = "Account";

				$rest.create(data);
			},
			"load": function(){
		        $rest.getData("Account", {}, [function(data, identifier){
		        	if (identifier == "loadAccounts" && data.accounts){
		        		for(var id in data.accounts.all){
			        		this.objects[id] = this.factory(data.accounts.all[ id ]);
		        		}

		        		this.sorts = data.accounts.sorts;

		        		$rootScope.$broadcast("loadedNewAccount", this);
		        	}
		        	console.log("will with work");
		        }, "loadAccounts", this]);
			},


			"factory": function(data){
				console.log("Creating Account object with controller factory!");
				var Account;
				if (data && data.id && this.objects[ data.id ]){
					Account = this.objects[ data.id ];
				} else {
					Account = new $Account(data);

					$.extend(Account, {
						"save": this.wrapper(this.save)
					});
				}

				return Account;
			},
		});
	}]);
})(window.SB.module);
;(function(module){
	"use strict";

	module.factory("$Band", ["$rootScope", function($rootScope) {
		var Band = function(data){
			$.extend(this, {
				"id": null,
				"persistent": false,
				"data": {},
				"cache": {}
			});

			this.set(data);
		};

		$.extend(Band.prototype, {
			"attrs": {
                "origin": {
                    "description": "",
                    "generator": "user",
                    "min": 3,
                    "default": "",
                    "max": 255,
                    "label": "Origin",
                    "type": "string",
                    "placeholder": "Satans asshole",
                    "name": "origin"
                },
                "archived": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Archived",
                    "placeholder": "",
                    "type": "boolean",
                    "name": "archived"
                },
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": 4000,
                    "label": "Description",
                    "type": "string",
                    "placeholder": "The best..fffucken...metAL Band OUT!! there...",
                    "name": "description"
                },
                "last_active": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "type": "timestamp",
                    "label": "Last active",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_active"
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
                "banned": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Banned",
                    "placeholder": "0",
                    "type": "boolean",
                    "name": "banned"
                },
                "activated": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Activated",
                    "placeholder": "1",
                    "type": "boolean",
                    "name": "activated"
                },
                "last_activated": {
                    "description": "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Activated",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "type": "timestamp",
                    "name": "last_activated"
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
                "last_login": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "type": "timestamp",
                    "label": "Last logged in",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_login"
                },
                "suspended": {
                    "description": "",
                    "generator": "system",
                    "default": 0,
                    "restricted": "True",
                    "label": "Suspended",
                    "placeholder": "0",
                    "type": "boolean",
                    "name": "suspended"
                },
                "active": {
                    "description": "",
                    "generator": "user",
                    "default": "yes",
                    "label": "Active",
                    "type": "option",
                    "options": {
                        "yes": {
                            "position": 0,
                            "label": "Yes",
                            "type": "string",
                            "description": "",
                            "name": "yes"
                        },
                        "no": {
                            "position": 1,
                            "label": "No",
                            "type": "string",
                            "description": "",
                            "name": "no"
                        }
                    },
                    "name": "active"
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
                    "placeholder": "Chao Lux",
                    "name": "name"
                }
            },

			"required": [
			
					"name"
			
			],

			"userSettable": [
			
					"origin"
			
					, "description"
			
					, "active"
			
					, "name"
			
			],

			"userVisible": [
			
					"origin"
			
					, "description"
			
					, "last_active"
			
					, "created"
			
					, "last_login"
			
					, "active"
			
					, "id"
			
					, "name"
			
			],

			"junctions": {
        "bandCreator": "Account",
        "bandMember": "Account",
        "bandGenre": "Descriptor"
    },

			"set": function(data){
				if (!data){
					return;
				}
				
				if (data.id){
					this.id = data.id;
					delete data.id;
				}
				console.log("Calling setter for Band")
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

		return Band;
	}]);


	module.service("BandController", ["$Band", "$rootScope", "$rest", function($Band, $rootScope, $rest) {

		/**
		 * For debugging purposes only, remove in production.
		 * @type {[type]}
		 */
		window._BandController = this;

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
				console.log("saving Band object");
				var data = self.data;

				data.target = "Band";

				$rest.create(data);
			},
			"load": function(){
		        $rest.getData("Band", {}, [function(data, identifier){
		        	if (identifier == "loadBands" && data.bands){
		        		for(var id in data.bands.all){
			        		this.objects[id] = this.factory(data.bands.all[ id ]);
		        		}

		        		this.sorts = data.bands.sorts;

		        		$rootScope.$broadcast("loadedNewBand", this);
		        	}
		        	console.log("will with work");
		        }, "loadBands", this]);
			},

				"bandCreator": function(self, Account){
					$rest.create({
						"target": "bandCreator",
						"from": self.get("id"),
						"to": Account.get("id")
					});
				},
				"bandMember": function(self, Account){
					$rest.create({
						"target": "bandMember",
						"from": self.get("id"),
						"to": Account.get("id")
					});
				},
				"bandGenre": function(self, Descriptor){
					$rest.create({
						"target": "bandGenre",
						"from": self.get("id"),
						"to": Descriptor.get("id")
					});
				},

			"factory": function(data){
				console.log("Creating Band object with controller factory!");
				var Band;
				if (data && data.id && this.objects[ data.id ]){
					Band = this.objects[ data.id ];
				} else {
					Band = new $Band(data);

					$.extend(Band, {
							"bandCreator": this.wrapper(this.bandCreator),
							"bandMember": this.wrapper(this.bandMember),
							"bandGenre": this.wrapper(this.bandGenre),
						"save": this.wrapper(this.save)
					});
				}

				return Band;
			},
		});
	}]);
})(window.SB.module);
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
	
	module.service("ObjectsService", [
			"DescriptorController",
			"AccountController",
			"VenueController",
			"EventController",
			"BandController",

		"$rest", function(
				DescriptorController,
				AccountController,
				VenueController,
				EventController,
				BandController,

			$rest
		){

		this.controllers = {
				"Descriptor": DescriptorController,
				"Account": AccountController,
				"Venue": VenueController,
				"Event": EventController,
				"Band": BandController,
		};
	}]);
})(window.SB.module);