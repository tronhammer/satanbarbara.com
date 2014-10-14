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
            "placeholder" => "Satans asshole",
            "type" => "string",
            "name" => "origin"
        ),
        "archived" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Archived",
            "restricted" => "True",
            "placeholder" => "",
            "name" => "archived"
        ),
        "description" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "4000",
            "label" => "Description",
            "placeholder" => "The best..fffucken...metAL Band OUT!! there...",
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
            "description" => "Time when entry was made.",
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
        "active" => array(
            "description" => "",
            "generator" => "user",
            "default" => "yes",
            "label" => "Active",
            "type" => "option",
            "options" => array(
                "yes" => array(
                    "position" => "0",
                    "description" => "",
                    "type" => "string",
                    "name" => "yes",
                    "label" => "Yes"
                ),
                "no" => array(
                    "position" => "1",
                    "description" => "",
                    "type" => "string",
                    "name" => "no",
                    "label" => "No"
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
            "placeholder" => "Chao Lux",
            "type" => "string",
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