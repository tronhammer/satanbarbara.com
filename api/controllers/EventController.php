<?php

abstract class EventController {
	
	static public function Create() {
		AJAX::Response("json",  Event::Create($_POST));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		$db = MySQLConnector::getHandle();

		try {
			// $statement = $db->prepare("SELECT `id` FROM `events`");
			$statement = $db->prepare("SELECT * FROM `events`");

			$statement->execute();

			$events = $statement->fetchAll(PDO::FETCH_ASSOC);

			$return = array(
				"events" => array(
					"all" => array(),
					"sorts" => array(
						"date" => array()
					)
				)
			);

			foreach($events as $event){
				$return["events"]["all"][ $event["id"] ] = $event;
				$return["events"]["sorts"]["date"][$event["date"]][] = $event["id"];
			}


			// foreach($events as $event){
			// 	$Event = new Event($account);
			// 	$return[$Event->id] = $Event->GetValues();
			// }
		} catch (PDOException $e) {
			return AJAX::Response("json", array(), 2, $e->getMessage());
		}

		AJAX::Response("json", $return);
	}

	static public function Update() {

	}

	static public function Delete() {

	}
}

AJAX::registerGetMethods("Event", array("Get", "Search"));
AJAX::registerPostMethods("Event", array("Create", "Update", "Delete"));