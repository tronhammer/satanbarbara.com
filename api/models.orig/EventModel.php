<?php

abstract class EventModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "events";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(
		"creator_id" => "is_numeric",
		"type_id" => "is_numeric",
		"title" => "is_string", 
		"subtitle" => "is_string", 
		"description" => "is_string", 
		"location" => "is_string",
		"date_text" => "is_string",
		"date" => "is_string",
		"start_time" => "is_string",
		"end_time" => "is_string",
		"ages" => "is_string",
		"venue" => "is_string",
		"venue_id" => "is_numeric",
		"venue_type_id" => "is_numeric",
		"price" => "is_string",
		"requirements" => "is_string",
		"genre_id" => "is_numeric",
		"map_uri" => "is_string",
		"ticket_uri" => "is_string",
		"promocode" => "is_string",
		"acts" => "is_string", 
		"guests" => "is_string",
		"actstotal" => "is_numeric",
		"gueststotal" => "is_numeric"
	);

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array("title", "location", "date", "start_time", "end_time", "venue");


	// static public function Create($data) {
	// 	$dbh = MySQLConnector::getHandle();

	// 	$statement = $dbh->prepare("INSERT INTO `satanbarbara`.`events` (`created`, `creator_id`,`title`,`location`,`ages`,`venue`,`price`,`date`,`start_time`,`end_time`,`type_id`,`venue_type_id`, `genre_id`) values (NOW(),?,?,?,?,?,?,?,?,?,?,?,?);");

	// 	if (!$statement->execute(array(
	// 		1,
	// 	    "Test BAABY",
	// 	    "test place",
	// 	    "18",
	// 	    "house party waaat",
	// 	    "12.50",
	// 	    "2014-1-1 5:23:52PM",
	// 	    "2014-1-1 5:23:52PM",
	// 	    "2014-1-1 5:23:52PM",
	// 	    1,
	// 	    1,
	// 	    1
	// 	))){
	// 		return $statement->errorInfo();
	// 	}

	// 	return $statement->fetchAll(PDO::FETCH_ASSOC);
	// }

		/**
	 * Class Methods
	 */
	static public function Create($data) {

		$data["created"] = date("Y-m-d h:i:s A");
		
		$event = self::Save($data);



		return $event->GetValues();
	}

	static public function Validate($data) {
		switch($data["name"]){
			case "created":
				break;
		}

		return $data["value"];
	}
}