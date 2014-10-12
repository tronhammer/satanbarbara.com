<?php

abstract class VenueController {
	
	static public function Create() {
		AJAX::Response("json",  Venue::Create($_POST));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		$db = MySQLConnector::getHandle();

		try {
			$statement = $db->prepare("SELECT `id` FROM `venues`");
	
			$statement->execute();

			$venues = $statement->fetchAll(PDO::FETCH_ASSOC);

			foreach($venues as $venues){
				$Venue = new Venue($venues);
				$return[$Venue->id] = $Venue->GetValues();
			}
		} catch (PDOException $e) {
			return AJAX::Response("json", array(), 2, $e->getMessage());
		}

		AJAX::Response("json", $return);
	}

	static public function Update() {

	}

	static public function Delete() {

	}

	static public function Search() {

	}
}

AJAX::registerGetMethods("Venue", array("Get", "Search"));
AJAX::registerPostMethods("Venue", array("Create", "Update", "Delete"));