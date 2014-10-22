<?php

abstract class DescriptorModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "descriptors";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(
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
            "placeholder" => "SO awesome!",
            "name" => "description"
        ),
        "created" => array(
            "description" => "Time when entry was made.",
            "generator" => "db",
            "type" => "timestamp",
            "required" => "True",
            "label" => "Created",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "name" => "created"
        ),
        "deleted" => array(
            "description" => "0",
            "generator" => "system",
            "default" => "0",
            "restricted" => "True",
            "label" => "Deleted",
            "placeholder" => "",
            "type" => "boolean",
            "name" => "deleted"
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
            "unique" => "True",
            "placeholder" => "awesome",
            "name" => "name"
        )
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		"name"

	);

	static protected $userSettable = array(

		"description"

		, "name"

	);

	static protected $userVisible = array(

		"description"

		, "created"

		, "id"

		, "name"

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