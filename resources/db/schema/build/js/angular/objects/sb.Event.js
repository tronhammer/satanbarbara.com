;(function(){
	"use strict";
	var module = SB.module;

	module.controller("Eventsontroller", ["$scope", "$Event", function($scope, $data, $Event) {

	});

	module.factory("$Event", ["$rootScope", "$rest", function($rootScope, $rest) {
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
                    "placeholder": "0",
                    "name": "archived"
                },
                "promocode": {
                    "description": "",
                    "generator": "user",
                    "max": "64",
                    "label": "Promocode",
                    "placeholder": "IKICKASSFORTHELORD",
                    "type": "string",
                    "name": "promocode"
                },
                "subtitle": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "90",
                    "label": "Subtitle",
                    "placeholder": "B-Y-O-Bible",
                    "type": "string",
                    "name": "subtitle"
                },
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "4000",
                    "label": "Description",
                    "placeholder": "This is gonna be hot!",
                    "type": "string",
                    "name": "description"
                },
                "title": {
                    "description": "",
                    "generator": "user",
                    "min": "3",
                    "default": "",
                    "max": "255",
                    "required": "True",
                    "label": "Title",
                    "placeholder": "SBCMT Bible Burning",
                    "type": "string",
                    "name": "title"
                },
                "deleted": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
                    "type": "boolean",
                    "label": "Deleted",
                    "placeholder": "0",
                    "name": "deleted"
                },
                "ticket_uri": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "255",
                    "label": "Ticket URL",
                    "placeholder": "http://",
                    "type": "string",
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
                "created": {
                    "description": "Time when entry was made.",
                    "generator": "db",
                    "type": "timestamp",
                    "label": "Created",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "created"
                },
                "ages": {
                    "description": "",
                    "generator": "user",
                    "default": "na",
                    "label": "Ages",
                    "type": "option",
                    "options": {
                        "18": {
                            "position": "1",
                            "description": "",
                            "type": "string",
                            "name": "18",
                            "label": "18+"
                        },
                        "all": {
                            "position": "0",
                            "description": "",
                            "type": "string",
                            "name": "all",
                            "label": "All"
                        },
                        "21": {
                            "position": "2",
                            "description": "",
                            "type": "string",
                            "name": "21",
                            "label": "21+"
                        },
                        "na": {
                            "position": "35",
                            "description": "",
                            "type": "string",
                            "name": "na",
                            "label": "Not Sure"
                        }
                    },
                    "name": "ages"
                },
                "price": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "type": "string",
                    "required": "True",
                    "label": "Event Price",
                    "placeholder": "$5",
                    "name": "price"
                },
                "canceled": {
                    "description": "",
                    "generator": "system",
                    "default": "0",
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
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "name": "end_time"
                },
                "date": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "type": "date",
                    "required": "True",
                    "label": "Event Date",
                    "placeholder": "2014-12-27",
                    "name": "date"
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
                "flyer_uri": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "255",
                    "label": "Flyer",
                    "placeholder": "http://",
                    "type": "string",
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
                    "description": "2014-11-25 04:34:00 pm",
                    "generator": "system",
                    "max": "35",
                    "label": "Date Full Text",
                    "placeholder": "2014-11-25 04:34:00 pm",
                    "type": "string",
                    "name": "date_text"
                }
            },
			"set": function(){

			},
			"get": function(){

			}
		};
	});
})(windo