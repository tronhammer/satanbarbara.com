<?php

abstract class BandController {
	
	static public function Create() {
		$Band = new Band($_REQUEST);
		$Band->Save();
		AJAX::Response("json",  array("saved" => $Band->isPersistent()));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		if ($_GET["ids"]){
			$bands = explode(",", $_GET["ids"]);
		} else {
			$db = MySQLConnector::getHandle();
			try {
				$statement = $db->prepare("SELECT `id` FROM `bands`");
		
				$statement->execute();

				$bands = $statement->fetchAll(PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				return AJAX::Response("json", array(), 2, $e->getMessage());
			}
		}

		foreach($bands as $BandID){
			$Band = new Band($BandID);
			$return[(string) $Band->GetID()] = $Band->GetValues(array("type"=>"visible"));
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
		AJAX::Response("json",  BandModel::GetSchema());
	}
}

AJAX::registerGetMethods("Band", array("Get", "Create", "Search", "Schema"));
AJAX::registerPostMethods("Band", array("Create", "Update", "Delete"));