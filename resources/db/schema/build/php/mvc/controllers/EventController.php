<?php

abstract class EventController extends BaseController{
	static protected $_target = "Event";
	static protected $_key = "events";

	static public function Get() {
		$return = array(
			"events" => array(
				"all" => array(),
				"sorts" => array(
					"date" => array()
				)
			)
		);
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;
		$getAssocs = isset($_GET["assocs"]) ? $_GET["assocs"] : 0;

		if ($_GET["ids"]){
			$events = explode(",", $_GET["ids"]);
		} else {
			$db = MySQLConnector::getHandle();
			try {
				$statement = $db->prepare("SELECT `id` FROM `".EventModel::_TABLE."`");
		
				$statement->execute();

				$events = $statement->fetchAll(PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				return AJAX::Response("json", array(), 2, $e->getMessage());
			}
		}

		foreach($events as $ObjectID){
			$Object = new self::$_target($ObjectID);
			$ObjectData = $Object->GetValues(array("type"=>"visible"));
			$return[self::$_key]["all"][ $Object->GetID() ] = $ObjectData;
			$return[self::$_key]["sorts"]["date"][ $ObjectData["date"] ][] = $Object->GetID();
			if ($getAssocs){
				$return[self::$_key]["all"][ $Object->GetID() ]["assocs"] = ObjectAssociation::GetAssocs($Object);
			}
		}

		AJAX::Response("json", $return);
	}
}

AJAX::registerGetMethods("Event", array("Get", "Search", "Schema"));
AJAX::registerPostMethods("Event", array("Create", "Update", "Delete"));