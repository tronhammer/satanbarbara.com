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