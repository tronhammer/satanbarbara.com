<?php

abstract class DescriptorController {
	
	static public function Create() {
		$Descriptor = new Descriptor($_REQUEST);
		$Descriptor->Save();
		AJAX::Response("json",  array("saved" => $Descriptor->isPersistent()));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		if ($_GET["ids"]){
			$descriptors = explode(",", $_GET["ids"]);
		} else {
			$db = MySQLConnector::getHandle();
			try {
				$statement = $db->prepare("SELECT `id` FROM `descriptors`");
		
				$statement->execute();

				$descriptors = $statement->fetchAll(PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				return AJAX::Response("json", array(), 2, $e->getMessage());
			}
		}

		foreach($descriptors as $DescriptorID){
			$Descriptor = new Descriptor($DescriptorID);
			$return[(string) $Descriptor->GetID()] = $Descriptor->GetValues(array("type"=>"visible"));
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
		AJAX::Response("json",  DescriptorModel::GetSchema());
	}
}

AJAX::registerGetMethods("Descriptor", array("Get", "Create", "Search", "Schema"));
AJAX::registerPostMethods("Descriptor", array("Create", "Update", "Delete"));