<?php

abstract class VenueController {
	
	static public function Create() {
		$Venue = new Venue($_REQUEST);
		$Venue->Save();
		AJAX::Response("json",  array("saved" => $Venue->isPersistent()));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		if ($_GET["ids"]){
			$venues = explode(",", $_GET["ids"]);
		} else {
			$db = MySQLConnector::getHandle();
			try {
				$statement = $db->prepare("SELECT `id` FROM `venues`");
		
				$statement->execute();

				$venues = $statement->fetchAll(PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				return AJAX::Response("json", array(), 2, $e->getMessage());
			}
		}

		foreach($venues as $VenueID){
			$Venue = new Venue($VenueID);
			$return[(string) $Venue->GetID()] = $Venue->GetValues(array("type"=>"visible"));
		}


		AJAX::Response("json", $return);
	}

	static public function Update() {

	}

	static public function Delete() {

	}

	static public function Search() {

	}


	static public function Schema() {
		AJAX::Response("json",  VenueModel::GetSchema());
	}
}

AJAX::registerGetMethods("Venue", array("Get", "Create", "Search", "Schema"));
AJAX::registerPostMethods("Venue", array("Create", "Update", "Delete"));