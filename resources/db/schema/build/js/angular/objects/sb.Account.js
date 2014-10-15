;(function(){
	"use strict";
	var module = SB.module;

	module.controller("Accountsontroller", ["$scope", "$Account", function($scope, $data, $Account) {

	});

	module.factory("$Account", ["$rootScope", "$rest", function($rootScope, $rest) {
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
                "username": {
                    "description": "Login name for the Account object.",
                    "generator": "user",
                    "min": "3",
                    "default": "",
                    "max": "32",
                    "required": "True",
                    "label": "Username",
                    "placeholder": "tronhammer",
                    "type": "string",
                    "name": "username"
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
                "description": {
                    "description": "",
                    "generator": "user",
                    "default": "",
                    "max": "4000",
                    "label": "Description",
                    "placeholder": "I'm freaken tron man! Get with it.",
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
                    "description": "Time when entry was made in the database.",
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
                "tagline": {
                    "description": "",
                    "generator": "user",
                    "min": "3",
                    "default": "",
                    "max": "128",
                    "label": "Tagline",
                    "placeholder": "I've eaten uglier women than you for breakfast.",
                    "type": "string",
                    "name": "tagline"
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
                "email": {
                    "description": "",
                    "generator": "user",
                    "min": "9",
                    "default": "",
                    "max": "255",
                    "required": "True",
                    "label": "Email",
                    "placeholder": "tron@tronnet.me",
                    "type": "string",
                    "name": "email"
                },
                "lname": {
                    "description": "",
                    "generator": "user",
                    "min": "3",
                    "default": "",
                    "max": "128",
                    "label": "Last Name",
                    "placeholder": "Hammer",
                    "type": "string",
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
                            "position": "0",
                            "description": "",
                            "type": "string",
                            "name": "admin",
                            "label": "Administrator"
                        },
                        "moderator": {
                            "position": "1",
                            "description": "",
                            "type": "string",
                            "name": "moderator",
                            "label": "Moderator"
                        },
                        "client": {
                            "position": "6",
                            "description": "",
                            "type": "string",
                            "name": "client",
                            "label": "Client"
                        },
                        "user": {
                            "position": "2",
                            "description": "",
                            "type": "string",
                            "name": "user",
                            "label": "User"
                        },
                        "deamon": {
                            "position": "5",
                            "description": "",
                            "type": "string",
                            "name": "deamon",
                            "label": "Deamon"
                        },
                        "root": {
                            "position": "4",
                            "description": "",
                            "type": "string",
                            "name": "root",
                            "label": "Root"
                        },
                        "proxy": {
                            "position": "3",
                            "description": "",
                            "type": "string",
                            "name": "na",
                            "label": "Not Sure"
                        }
                    },
                    "name": "privilege_level"
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
                "fname": {
                    "description": "",
                    "generator": "user",
                    "min": "3",
                    "default": "",
                    "max": "128",
                    "required": "True",
                    "label": "First Name",
                    "placeholder": "Tron",
                    "type": "string",
                    "name": "fname"
                },
                "password": {
                    "description": "Case sensitive password for authenticating the Account object.",
                    "generator": "user",
                    "min": "6",
                    "default": "",
                    "max": "128",
                    "required": "True",
                    "label": "Password",
                    "placeholder": "666SatanForPrez",
                    "restricted": "True",
                    "type": "string",
                    "name": "password"
                },
                "nickname": {
                    "description": "",
                    "generator": "user",
                    "min": "3",
                    "default": "",
                    "max": "64",
                    "label": "Nickname",
                    "placeholder": "TRONHAMBURGER",
                    "type": "string",
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
			"set": function(){

			},
			"get": function(){

			}
		};
	});
})(windo