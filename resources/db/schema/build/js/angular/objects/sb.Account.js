;(function(module){
	"use strict";

	module.factory("$Account", ["$rootScope", function($rootScope) {
		var Account = function(data){
			$.extend(this, {
				"id": null,
				"associations": {},
				"persistent": false,
				"data": {},
				"cache": {}
			});

			this.set(data);
		};

		$.extend(Account.prototype, {
			"target": "Account",
			"key": "accounts",

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
				
				console.log("Calling setter for Account")

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
		        $rest.getData({"target": "Account", "assocs": 1}, [function(data, identifier){
		        	if (identifier == "loadAccountObjects" && data.accounts){
		        		for(var id in data.accounts.all){
			        		this.objects[id] = this.factory(data.accounts.all[ id ]);
		        		}

		        		this.sorts = data.accounts.sorts;

		        		$rootScope.$broadcast("loadedNewAccountObjects", this);
		        	}
		        	console.log("will with work");
		        }, "loadAccountObjects", this]);
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

					if (data && data.id){
						this.objects[ data.id ] = Account;
					}
				}

				return Account;
			},
		});
	}]);
})(window.SB.module);