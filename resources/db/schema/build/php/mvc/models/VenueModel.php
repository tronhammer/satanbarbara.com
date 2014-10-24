<?php

abstract class VenueModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "venues";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(
        "city" => array(
            "description" => "",
            "generator" => "user",
            "max" => "90",
            "required" => "True",
            "label" => "City",
            "type" => "string",
            "placeholder" => "Satan Barbara",
            "name" => "city"
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
        "slogan" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "90",
            "label" => "Slogan",
            "type" => "string",
            "placeholder" => "Fuck it",
            "name" => "slogan"
        ),
        "description" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "4000",
            "label" => "Description",
            "type" => "string",
            "placeholder" => "Where you go to get your freak on.",
            "name" => "description"
        ),
        "zip" => array(
            "description" => "",
            "generator" => "user",
            "min" => "5",
            "max" => "12",
            "required" => "True",
            "label" => "Postal Code",
            "type" => "string",
            "placeholder" => "93101",
            "name" => "zip"
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
        "requirements" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "4000",
            "label" => "Requirements",
            "type" => "string",
            "placeholder" => "At least 1 bible.",
            "name" => "requirements"
        ),
        "uri" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "255",
            "label" => "Website",
            "type" => "string",
            "placeholder" => "http://",
            "name" => "uri"
        ),
        "state" => array(
            "description" => "",
            "generator" => "user",
            "max" => "2",
            "required" => "True",
            "label" => "State",
            "type" => "string",
            "placeholder" => "CA",
            "name" => "state"
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
        "address" => array(
            "description" => "",
            "generator" => "user",
            "max" => "255",
            "required" => "True",
            "label" => "Address",
            "type" => "string",
            "placeholder" => "666 Hell-yeah",
            "name" => "address"
        ),
        "capacity" => array(
            "name" => "capacity",
            "generator" => "user",
            "type" => "integer",
            "label" => "Capacity",
            "placeholder" => "400",
            "description" => "400"
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
            "placeholder" => "CrowdedCoffin",
            "name" => "name"
        )
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		"city"

		, "zip"

		, "state"

		, "address"

		, "name"

	);

	static protected $userSettable = array(

		"city"

		, "slogan"

		, "description"

		, "zip"

		, "requirements"

		, "uri"

		, "state"

		, "address"

		, "capacity"

		, "name"

	);

	static protected $userVisible = array(

		"city"

		, "slogan"

		, "description"

		, "zip"

		, "created"

		, "requirements"

		, "uri"

		, "state"

		, "address"

		, "capacity"

		, "id"

		, "name"

	);

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static public $references = array(
        "venueOwner" => "Account",
        "venueTag" => "Descriptor",
        "venueCreator" => "Account"
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