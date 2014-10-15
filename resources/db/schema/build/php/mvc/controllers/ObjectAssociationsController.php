<?php

abstract class ObjectAssociationsController {
	
	static public function Create() {
		$ids = array();
		$associations = $_REQUEST["associations"];

		foreach($associations as $assocName=>$assocPointers){
			if (isset($assocPointers["from"]) && isset($assocPointers["to"])){
				$to = new $assocPointers["to"]["target"]($assocPointers["to"]["id"]);
				$from = new $assocPointers["from"]["target"]($assocPointers["from"]["id"]);

				$ids[$assocName] = ObjectAssociation::MakeAssoc($assocName, $from, $to);
			} else if (is_array($assocPointers)) {
				foreach($assocPointers as $assocGroupPos=>$assocGroupEntry){
					$to = new $assocGroupEntry["to"]["target"]($assocGroupEntry["to"]["id"]);
					$from = new $assocGroupEntry["from"]["target"]($assocGroupEntry["from"]["id"]);

					$ids[$assocName][] = ObjectAssociation::MakeAssoc($assocName, $from, $to);
				}
			}
		}

		AJAX::Response("json",  array("saved" => $ids));
	}
}

AJAX::registerGetMethods("ObjectAssociations", array("Get", "Search"));
AJAX::registerPostMethods("ObjectAssociations", array("Create", "Delete"));