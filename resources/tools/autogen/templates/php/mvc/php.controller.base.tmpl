<?php

abstract class BaseController {
	
	static public function Create() {
		$Object = new static::$_target($_REQUEST);
		$Object->Save();

		AJAX::Response("json",  array("saved" => $Object->GetID()));
	}

	static public function Get() {
		$Model = static::$_target."Model";
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;
		$getAssocs = isset($_GET["assocs"]) ? $_GET["assocs"] : 0;

		if ($_GET["ids"]){
			$objects = explode(",", $_GET["ids"]);
		} else {
			$db = MySQLConnector::getHandle();
			try {
				$statement = $db->prepare("SELECT `id` FROM `".$Model::_TABLE."`");
		
				$statement->execute();

				$objects = $statement->fetchAll(PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				return AJAX::Response("json", array(), 2, $e->getMessage());
			}
		}

		foreach($objects as $ObjectID){
			$Object = new static::$_target($ObjectID);
			$return[static::$_key]["all"][ $Object->GetID() ] = $Object->GetValues(array("type"=>"visible"));
			if ($getAssocs){
				$return[static::$_key]["all"][ $Object->GetID() ]["assocs"] = ObjectAssociation::GetAssocs($Object);
			}
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
		$Model = static::$_target."Model";
		AJAX::Response("json",  $Model::GetSchema());
	}
}