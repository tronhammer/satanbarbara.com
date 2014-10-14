<?php

abstract class AccountController {
	
	static public function Create() {
		$Account = new Account($_REQUEST);
		$Account->Save();
		AJAX::Response("json",  array("saved" => $Account->isPersistent()));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		if ($_GET["ids"]){
			$accounts = explode(",", $_GET["ids"]);
		} else {
			$db = MySQLConnector::getHandle();
			try {
				$statement = $db->prepare("SELECT `id` FROM `accounts`");
		
				$statement->execute();

				$accounts = $statement->fetchAll(PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				return AJAX::Response("json", array(), 2, $e->getMessage());
			}
		}

		foreach($accounts as $AccountID){
			$Account = new Account($AccountID);
			$return[(string) $Account->GetID()] = $Account->GetValues(array("type"=>"visible"));
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
		AJAX::Response("json",  AccountModel::GetSchema());
	}
}

AJAX::registerGetMethods("Account", array("Get", "Create", "Search", "Schema"));
AJAX::registerPostMethods("Account", array("Create", "Update", "Delete"));