<?php

abstract class EventController {
	
	static public function Create() {
		$Event = new Event($_REQUEST);
		$Event->Save();
		AJAX::Response("json",  array("saved" => $Event->isPersistent()));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		if ($_GET["ids"]){
			$events = explode(",", $_GET["ids"]);
		} else {
			$db = MySQLConnector::getHandle();
			try {
				$statement = $db->prepare("SELECT `id` FROM `events`");
		
				$statement->execute();

				$events = $statement->fetchAll(PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				return AJAX::Response("json", array(), 2, $e->getMessage());
			}
		}

		foreach($events as $EventID){
			$Event = new Event($EventID);
			$return[(string) $Event->GetID()] = $Event->GetValues(array("type"=>"visible"));
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
		AJAX::Response("json",  EventModel::GetSchema());
	}
}

AJAX::registerGetMethods("Event", array("Get", "Create", "Search", "Schema"));
AJAX::registerPostMethods("Event", array("Create", "Update", "Delete"));