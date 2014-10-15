;(function(){
	"use strict";
	var module = SB.module;

	module.controller("Venuesontroller", ["$scope", "$Venue", function($scope, $data, $Venue) {

	});

	module.factory("$Venue", ["$rootScope", "$rest", function($rootScope, $rest) {
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
                "city": {
                    "description": "",
                    "generator": "user",
                    "max": "90",
                    "required": "True",
                    "label": "City",
                    "placeholder": "Satan Barbara",
                    "type": "string",
                    "name": "city"
                },
                "archived": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "boolean",
                    "label": "Archived",
                    "restricted": "True",
                    "placeholder": "0",
                    "name": "archived"
                },
                "slogan": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "90",
                    "label": "Slogan",
                    "placeholder": "Fuck it",
                    "type": "string",
                    "name": "slogan"
                },
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "4000",
                    "label": "Description",
                    "placeholder": "Where you go to get your freak on.",
                    "type": "string",
                    "name": "description"
                },
                "zip": {
                    "description": "",
                    "generator": "user",
                    "min": "5",
                    "max": "12",
                    "required": "True",
                    "label": "Postal Code",
                    "placeholder": "93101",
                    "type": "string",
                    "name": "zip"
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
                "requirements": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "4000",
                    "label": "Requirements",
                    "placeholder": "At least 1 bible.",
                    "type": "string",
                    "name": "requirements"
                },
                "uri": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "255",
                    "label": "Website",
                    "placeholder": "http://",
                    "type": "string",
                    "name": "uri"
                },
                "state": {
                    "description": "",
                    "generator": "user",
                    "max": "2",
                    "required": "True",
                    "label": "State",
                    "placeholder": "CA",
                    "type": "string",
                    "name": "state"
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
                "address": {
                    "description": "",
                    "generator": "user",
                    "max": "255",
                    "required": "True",
                    "label": "Address",
                    "placeholder": "666 Hell-yeah",
                    "type": "string",
                    "name": "address"
                },
                "capacity": {
                    "description": "400",
                    "generator": "user",
                    "type": "integer",
                    "label": "Capacity",
                    "placeholder": "400",
                    "name": "capacity"
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
                    "placeholder": "CrowdedCoffin",
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