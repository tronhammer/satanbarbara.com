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
            "placeholder" => "tronhammer",
            "type" => "string",
            "name" => "username"
        ),
        "archived" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Archived",
            "restricted" => "True",
            "placeholder" => "0",
            "name" => "archived"
        ),
        "description" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "4000",
            "label" => "Description",
            "placeholder" => "I'm freaken tron man! Get with it.",
            "type" => "string",
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
            "description" => "Time when entry was made in the database.",
            "generator" => "db",
            "type" => "timestamp",
            "label" => "Created",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "name" => "created"
        ),
        "deleted" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Deleted",
            "restricted" => "True",
            "placeholder" => "0",
            "name" => "deleted"
        ),
        "tagline" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "128",
            "label" => "Tagline",
            "placeholder" => "I've eaten uglier women than you for breakfast.",
            "type" => "string",
            "name" => "tagline"
        ),
        "banned" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Banned",
            "restricted" => "True",
            "placeholder" => "0",
            "name" => "banned"
        ),
        "activated" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Activated",
            "restricted" => "True",
            "placeholder" => "1",
            "name" => "activated"
        ),
        "suspended" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Suspended",
            "restricted" => "True",
            "placeholder" => "0",
            "name" => "suspended"
        ),
        "email" => array(
            "description" => "",
            "generator" => "user",
            "min" => "9",
            "default" => "",
            "max" => "255",
            "required" => "True",
            "label" => "Email",
            "placeholder" => "tron@tronnet.me",
            "type" => "string",
            "name" => "email"
        ),
        "lname" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "128",
            "label" => "Last Name",
            "placeholder" => "Hammer",
            "type" => "string",
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
                    "description" => "",
                    "type" => "string",
                    "name" => "admin",
                    "label" => "Administrator"
                ),
                "moderator" => array(
                    "position" => "1",
                    "description" => "",
                    "type" => "string",
                    "name" => "moderator",
                    "label" => "Moderator"
                ),
                "client" => array(
                    "position" => "6",
                    "description" => "",
                    "type" => "string",
                    "name" => "client",
                    "label" => "Client"
                ),
                "user" => array(
                    "position" => "2",
                    "description" => "",
                    "type" => "string",
                    "name" => "user",
                    "label" => "User"
                ),
                "deamon" => array(
                    "position" => "5",
                    "description" => "",
                    "type" => "string",
                    "name" => "deamon",
                    "label" => "Deamon"
                ),
                "root" => array(
                    "position" => "4",
                    "description" => "",
                    "type" => "string",
                    "name" => "root",
                    "label" => "Root"
                ),
                "proxy" => array(
                    "position" => "3",
                    "description" => "",
                    "type" => "string",
                    "name" => "na",
                    "label" => "Not Sure"
                )
            ),
            "name" => "privilege_level"
        ),
        "last_activated" => array(
            "description" => "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
            "generator" => "system",
            "default" => "0",
            "type" => "timestamp",
            "label" => "Activated",
            "restricted" => "True",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "name" => "last_activated"
        ),
        "last_modified" => array(
            "description" => "",
            "generator" => "system",
            "default" => "",
            "type" => "timestamp",
            "label" => "Last modified",
            "restricted" => "True",
            "placeholder" => "2014-11-25 04:34:00 pm",
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
        "fname" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "128",
            "required" => "True",
            "label" => "First Name",
            "placeholder" => "Tron",
            "type" => "string",
            "name" => "fname"
        ),
        "password" => array(
            "description" => "Case sensitive password for authenticating the Account object.",
            "generator" => "user",
            "min" => "6",
            "default" => "",
            "max" => "128",
            "required" => "True",
            "label" => "Password",
            "placeholder" => "666SatanForPrez",
            "restricted" => "True",
            "type" => "string",
            "name" => "password"
        ),
        "nickname" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "64",
            "label" => "Nickname",
            "placeholder" => "TRONHAMBURGER",
            "type" => "string",
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