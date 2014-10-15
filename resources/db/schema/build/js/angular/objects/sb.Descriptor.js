;(function(){
	"use strict";
	var module = SB.module;

	module.controller("Descriptorsontroller", ["$scope", "$Descriptor", function($scope, $data, $Descriptor) {

	});

	module.factory("$Descriptor", ["$rootScope", "$rest", function($rootScope, $rest) {
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
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "4000",
                    "label": "Description",
                    "placeholder": "SO awesome!",
                    "type": "string",
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
                    "default": "0",
                    "type": "boolean",
                    "label": "Deleted",
                    "restricted": "True",
                    "placeholder": "",
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
                    "min": "3",
                    "default": "",
                    "max": "255",
                    "required": "True",
                    "label": "Name",
                    "placeholder": "awesome",
                    "unique": "True",
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