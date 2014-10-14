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
            "placeholder" => "Satan Barbara",
            "type" => "string",
            "name" => "city"
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
        "slogan" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "90",
            "label" => "Slogan",
            "placeholder" => "Fuck it",
            "type" => "string",
            "name" => "slogan"
        ),
        "description" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "4000",
            "label" => "Description",
            "placeholder" => "Where you go to get your freak on.",
            "type" => "string",
            "name" => "description"
        ),
        "zip" => array(
            "description" => "",
            "generator" => "user",
            "min" => "5",
            "max" => "12",
            "required" => "True",
            "label" => "Postal Code",
            "placeholder" => "93101",
            "type" => "string",
            "name" => "zip"
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
        "requirements" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "4000",
            "label" => "Requirements",
            "placeholder" => "At least 1 bible.",
            "type" => "string",
            "name" => "requirements"
        ),
        "uri" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "255",
            "label" => "Website",
            "placeholder" => "http://",
            "type" => "string",
            "name" => "uri"
        ),
        "state" => array(
            "description" => "",
            "generator" => "user",
            "max" => "2",
            "required" => "True",
            "label" => "State",
            "placeholder" => "CA",
            "type" => "string",
            "name" => "state"
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
        "address" => array(
            "description" => "",
            "generator" => "user",
            "max" => "255",
            "required" => "True",
            "label" => "Address",
            "placeholder" => "666 Hell-yeah",
            "type" => "string",
            "name" => "address"
        ),
        "capacity" => array(
            "description" => "400",
            "generator" => "user",
            "type" => "integer",
            "label" => "Capacity",
            "placeholder" => "400",
            "name" => "capacity"
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
            "placeholder" => "CrowdedCoffin",
            "type" => "string",
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