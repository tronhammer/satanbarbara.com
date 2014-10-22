<?php

abstract class AccountModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "accounts";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(
        "username" => array(
            "description" => "Login name for the Account object.",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "32",
            "required" => "True",
            "label" => "Username",
            "type" => "string",
            "placeholder" => "tronhammer",
            "name" => "username"
        ),
        "archived" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "restricted" => "True",
            "label" => "Archived",
            "placeholder" => "0",
            "type" => "boolean",
            "name" => "archived"
        ),
        "description" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "4000",
            "label" => "Description",
            "type" => "string",
            "placeholder" => "I'm freaken tron man! Get with it.",
            "name" => "description"
        ),
        "last_active" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "timestamp",
            "label" => "Last active",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "name" => "last_active"
        ),
        "created" => array(
            "name" => "created",
            "generator" => "db",
            "type" => "timestamp",
            "label" => "Created",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "description" => "Time when entry was made in the database."
        ),
        "deleted" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "restricted" => "True",
            "label" => "Deleted",
            "placeholder" => "0",
            "type" => "boolean",
            "name" => "deleted"
        ),
        "tagline" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "128",
            "label" => "Tagline",
            "type" => "string",
            "placeholder" => "I've eaten uglier women than you for breakfast.",
            "name" => "tagline"
        ),
        "banned" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "restricted" => "True",
            "label" => "Banned",
            "placeholder" => "0",
            "type" => "boolean",
            "name" => "banned"
        ),
        "activated" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "restricted" => "True",
            "label" => "Activated",
            "placeholder" => "1",
            "type" => "boolean",
            "name" => "activated"
        ),
        "email" => array(
            "description" => "",
            "generator" => "user",
            "min" => "9",
            "default" => "",
            "max" => "255",
            "required" => "True",
            "label" => "Email",
            "type" => "string",
            "placeholder" => "tron@tronnet.me",
            "name" => "email"
        ),
        "lname" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "128",
            "label" => "Last Name",
            "type" => "string",
            "placeholder" => "Hammer",
            "name" => "lname"
        ),
        "privilege_level" => array(
            "description" => "",
            "generator" => "system",
            "default" => "user",
            "label" => "Privilege Level",
            "type" => "option",
            "options" => array(
                "admin" => array(
                    "position" => "0",
                    "label" => "Administrator",
                    "type" => "string",
                    "description" => "",
                    "name" => "admin"
                ),
                "moderator" => array(
                    "position" => "1",
                    "label" => "Moderator",
                    "type" => "string",
                    "description" => "",
                    "name" => "moderator"
                ),
                "client" => array(
                    "position" => "6",
                    "label" => "Client",
                    "type" => "string",
                    "description" => "",
                    "name" => "client"
                ),
                "user" => array(
                    "position" => "2",
                    "label" => "User",
                    "type" => "string",
                    "description" => "",
                    "name" => "user"
                ),
                "deamon" => array(
                    "position" => "5",
                    "label" => "Deamon",
                    "type" => "string",
                    "description" => "",
                    "name" => "deamon"
                ),
                "root" => array(
                    "position" => "4",
                    "label" => "Root",
                    "type" => "string",
                    "description" => "",
                    "name" => "root"
                ),
                "proxy" => array(
                    "position" => "3",
                    "label" => "Not Sure",
                    "type" => "string",
                    "description" => "",
                    "name" => "na"
                )
            ),
            "name" => "privilege_level"
        ),
        "last_activated" => array(
            "description" => "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
            "generator" => "system",
            "default" => "0",
            "restricted" => "True",
            "label" => "Activated",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "type" => "timestamp",
            "name" => "last_activated"
        ),
        "last_modified" => array(
            "description" => "",
            "generator" => "system",
            "default" => "",
            "restricted" => "True",
            "label" => "Last modified",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "type" => "timestamp",
            "name" => "last_modified"
        ),
        "last_login" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "timestamp",
            "label" => "Last logged in",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "name" => "last_login"
        ),
        "suspended" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "restricted" => "True",
            "label" => "Suspended",
            "placeholder" => "0",
            "type" => "boolean",
            "name" => "suspended"
        ),
        "fname" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "128",
            "required" => "True",
            "label" => "First Name",
            "type" => "string",
            "placeholder" => "Tron",
            "name" => "fname"
        ),
        "password" => array(
            "type" => "string",
            "description" => "Case sensitive password for authenticating the Account object.",
            "generator" => "user",
            "min" => "6",
            "default" => "",
            "max" => "128",
            "required" => "True",
            "label" => "Password",
            "restricted" => "True",
            "placeholder" => "666SatanForPrez",
            "name" => "password"
        ),
        "nickname" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "64",
            "label" => "Nickname",
            "type" => "string",
            "placeholder" => "TRONHAMBURGER",
            "name" => "nickname"
        ),
        "id" => array(
            "description" => "Exists as a unique identifier for Account objects in both the database and program layer.",
            "generator" => "db",
            "incremented" => "True",
            "label" => "Unique ID",
            "unique" => "True",
            "type" => "id",
            "name" => "id"
        )
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		"username"

		, "email"

		, "fname"

		, "password"

	);

	static protected $userSettable = array(

		"username"

		, "description"

		, "tagline"

		, "email"

		, "lname"

		, "fname"

		, "password"

		, "nickname"

	);

	static protected $userVisible = array(

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

	);

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $references = array(
        
    );

	/**
	 * Class Methods
	 */
	static public function Create($data) {
		$data["created"] = date("Y-m-d h:i:s A");
		
		self::Save($data);

		return array("good!");
	}

	static public function Validate($data) {
		switch($data["name"]){
			case "created":
				break;
		}

		return $data["value"];
	}
}