<?php

abstract class BandModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "bands";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(
        "origin" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "255",
            "label" => "Origin",
            "type" => "string",
            "placeholder" => "Satans asshole",
            "name" => "origin"
        ),
        "archived" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "restricted" => "True",
            "label" => "Archived",
            "placeholder" => "",
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
            "placeholder" => "The best..fffucken...metAL Band OUT!! there...",
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
            "description" => "Time when entry was made."
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
        "active" => array(
            "description" => "",
            "generator" => "user",
            "default" => "yes",
            "label" => "Active",
            "type" => "option",
            "options" => array(
                "yes" => array(
                    "position" => "0",
                    "label" => "Yes",
                    "type" => "string",
                    "description" => "",
                    "name" => "yes"
                ),
                "no" => array(
                    "position" => "1",
                    "label" => "No",
                    "type" => "string",
                    "description" => "",
                    "name" => "no"
                )
            ),
            "name" => "active"
        ),
        "id" => array(
            "description" => "",
            "generator" => "db",
            "incremented" => "True",
            "label" => "Unique ID",
            "unique" => "True",
            "type" => "id",
            "name" => "id"
        ),
        "name" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "255",
            "required" => "True",
            "label" => "Name",
            "type" => "string",
            "placeholder" => "Chao Lux",
            "name" => "name"
        )
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		"name"

	);

	static protected $userSettable = array(

		"origin"

		, "description"

		, "active"

		, "name"

	);

	static protected $userVisible = array(

		"origin"

		, "description"

		, "last_active"

		, "created"

		, "last_login"

		, "active"

		, "id"

		, "name"

	);

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static public $references = array(
        "bandCreator" => "Account",
        "bandMember" => "Account",
        "bandGenre" => "Descriptor"
    );

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