<?php

abstract class EventModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "events";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(
        "archived" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Archived",
            "placeholder" => "0",
            "name" => "archived"
        ),
        "subtitle" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "90",
            "label" => "Subtitle",
            "type" => "string",
            "placeholder" => "B-Y-O-Bible",
            "name" => "subtitle"
        ),
        "description" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "4000",
            "label" => "Description",
            "type" => "string",
            "placeholder" => "This is gonna be hot!",
            "name" => "description"
        ),
        "title" => array(
            "description" => "",
            "generator" => "user",
            "min" => "3",
            "default" => "",
            "max" => "255",
            "required" => "True",
            "label" => "Title",
            "type" => "string",
            "placeholder" => "SBCMT Bible Burning",
            "name" => "title"
        ),
        "deleted" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Deleted",
            "placeholder" => "0",
            "name" => "deleted"
        ),
        "ticket_uri" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "255",
            "label" => "Ticket URL",
            "type" => "string",
            "placeholder" => "http://",
            "name" => "ticket_uri"
        ),
        "start_time" => array(
            "description" => "",
            "generator" => "user",
            "type" => "timestamp",
            "required" => "True",
            "label" => "Start Time",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "name" => "start_time"
        ),
        "promocode" => array(
            "description" => "",
            "generator" => "user",
            "max" => "64",
            "label" => "Promocode",
            "placeholder" => "IKICKASSFORTHELORD",
            "type" => "string",
            "name" => "promocode"
        ),
        "ages" => array(
            "description" => "",
            "generator" => "user",
            "default" => "na",
            "label" => "Ages",
            "type" => "option",
            "options" => array(
                "18" => array(
                    "position" => "1",
                    "label" => "18+",
                    "type" => "string",
                    "description" => "",
                    "name" => "18"
                ),
                "all" => array(
                    "position" => "0",
                    "label" => "All",
                    "type" => "string",
                    "description" => "",
                    "name" => "all"
                ),
                "21" => array(
                    "position" => "2",
                    "label" => "21+",
                    "type" => "string",
                    "description" => "",
                    "name" => "21"
                ),
                "na" => array(
                    "position" => "35",
                    "label" => "Not Sure",
                    "type" => "string",
                    "description" => "",
                    "name" => "na"
                )
            ),
            "name" => "ages"
        ),
        "created" => array(
            "name" => "created",
            "generator" => "db",
            "type" => "timestamp",
            "label" => "Created",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "description" => "Time when entry was made."
        ),
        "price" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "placeholder" => "$5",
            "required" => "True",
            "label" => "Event Price",
            "type" => "string",
            "name" => "price"
        ),
        "canceled" => array(
            "description" => "",
            "generator" => "system",
            "default" => "0",
            "type" => "boolean",
            "label" => "Canceled",
            "placeholder" => "0",
            "name" => "canceled"
        ),
        "last_modified" => array(
            "description" => "",
            "generator" => "system",
            "default" => "",
            "type" => "timestamp",
            "label" => "Last modified",
            "placeholder" => "2014-11-25 04:34:00 pm",
            "name" => "last_modified"
        ),
        "end_time" => array(
            "description" => "",
            "generator" => "user",
            "type" => "timestamp",
            "required" => "True",
            "label" => "End Time",
            "placeholder" => "2014-11-25 11:34:00 pm",
            "name" => "end_time"
        ),
        "date" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "placeholder" => "2014-12-27",
            "required" => "True",
            "label" => "Event Date",
            "type" => "date",
            "name" => "date"
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
        "flyer_uri" => array(
            "description" => "",
            "generator" => "user",
            "default" => "",
            "max" => "255",
            "label" => "Flyer",
            "type" => "string",
            "placeholder" => "http://",
            "name" => "flyer_uri"
        ),
        "id" => array(
            "description" => "",
            "generator" => "db",
            "incremented" => "True",
            "required" => "True",
            "label" => "Unique ID",
            "unique" => "True",
            "type" => "id",
            "name" => "id"
        ),
        "date_text" => array(
            "description" => "2014-11-25",
            "generator" => "system",
            "max" => "35",
            "label" => "Date Full Text",
            "placeholder" => "2014-11-25",
            "type" => "string",
            "name" => "date_text"
        )
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		"title"

		, "start_time"

		, "price"

		, "end_time"

		, "date"

	);

	static protected $userSettable = array(

		"subtitle"

		, "description"

		, "title"

		, "ticket_uri"

		, "start_time"

		, "promocode"

		, "ages"

		, "price"

		, "end_time"

		, "date"

		, "requirements"

		, "flyer_uri"

	);

	static protected $userVisible = array(

		"archived"

		, "subtitle"

		, "description"

		, "title"

		, "deleted"

		, "ticket_uri"

		, "start_time"

		, "promocode"

		, "ages"

		, "created"

		, "price"

		, "canceled"

		, "last_modified"

		, "end_time"

		, "date"

		, "requirements"

		, "flyer_uri"

		, "id"

		, "date_text"

	);

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static public $references = array(
        "eventBand" => "Band",
        "eventVenue" => "Venue",
        "eventCreator" => "Account",
        "eventGenre" => "Descriptor",
        "eventAttendee" => "Account"
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