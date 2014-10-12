<?php

abstract class BandController {
	
	static public function Create() {
		AJAX::Response("json",  Band::Create($_POST));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		$db = MySQLConnector::getHandle();

		try {
			$statement = $db->prepare("SELECT `id` FROM `bands`");
	
			$statement->execute();

			$bands = $statement->fetchAll(PDO::FETCH_ASSOC);

			foreach($bands as $bands){
				$Band = new Band($bands);
				$return[$Band->id] = $Band->GetValues();
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

AJAX::registerGetMethods("Band", array("Get", "Search"));
AJAX::registerPostMethods("Band", array("Create", "Update", "Delete"));