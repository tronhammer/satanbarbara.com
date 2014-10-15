;(function(){
	"use strict";
	var module = SB.module;

	module.controller("Bandsontroller", ["$scope", "$Band", function($scope, $data, $Band) {

	});

	module.factory("$Band", ["$rootScope", "$rest", function($rootScope, $rest) {
		return {
			"set": function(){

			},
			"get": function(){

			}
		};
	});
})(window.SB);

	module.factory("$", ["$rootScope", "$rest", function($rootScope, $rest) {
		return {
			"attrs": {
                "origin": {
                    "description": "",
                    "generator": "user",
                    "min": "3",
                    "default": "",
                    "max": "255",
                    "label": "Origin",
                    "placeholder": "Satans asshole",
                    "type": "string",
                    "name": "origin"
                },
                "archived": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "boolean",
                    "label": "Archived",
                    "restricted": "True",
                    "placeholder": "",
                    "name": "archived"
                },
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "4000",
                    "label": "Description",
                    "placeholder": "The best..fffucken...metAL Band OUT!! there...",
                    "type": "string",
                    "name": "description"
                },
                "last_active": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "timestamp",
                    "label": "Last active",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_active"
                },
                "created": {
                    "description": "Time when entry was made.",
                    "generator": "db",
                    "type": "timestamp",
                    "label": "Created",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "created"
                },
                "deleted": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "boolean",
                    "label": "Deleted",
                    "restricted": "True",
                    "placeholder": "0",
                    "name": "deleted"
                },
                "banned": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "boolean",
                    "label": "Banned",
                    "restricted": "True",
                    "placeholder": "0",
                    "name": "banned"
                },
                "activated": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "boolean",
                    "label": "Activated",
                    "restricted": "True",
                    "placeholder": "1",
                    "name": "activated"
                },
                "last_activated": {
                    "description": "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
                    "generator": "system",
                    "default": "0",
                    "type": "timestamp",
                    "label": "Activated",
                    "restricted": "True",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_activated"
                },
                "last_modified": {
                    "description": "",
                    "generator": "system",
                    "default": "",
                    "type": "timestamp",
                    "label": "Last modified",
                    "restricted": "True",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_modified"
                },
                "last_login": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "timestamp",
                    "label": "Last logged in",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "last_login"
                },
                "suspended": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "boolean",
                    "label": "Suspended",
                    "restricted": "True",
                    "placeholder": "0",
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
                            "position": "0",
                            "description": "",
                            "type": "string",
                            "name": "yes",
                            "label": "Yes"
                        },
                        "no": {
                            "position": "1",
                            "description": "",
                            "type": "string",
                            "name": "no",
                            "label": "No"
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
                    "min": "3",
                    "default": "",
                    "max": "255",
                    "required": "True",
                    "label": "Name",
                    "placeholder": "Chao Lux",
                    "type": "string",
                    "name": "name"
                }
            },
			"set": function(){

			},
			"get": function(){

			}
		};
	});
})(windo