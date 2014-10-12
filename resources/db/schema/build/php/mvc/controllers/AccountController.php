<?php

abstract class AccountController {
	
	static public function Create() {
		AJAX::Response("json",  Account::Create($_POST));
	}

	static public function Get() {
		$return = array();
		$start = isset($_GET["start"]) ? $_GET["start"] : 0;
		$end = isset($_GET["end"]) ? $_GET["end"] : 0;
		$limit = isset($_GET["limit"]) ? $_GET["limit"] : 0;

		$db = MySQLConnector::getHandle();

		try {
			$statement = $db->prepare("SELECT `id` FROM `accounts`");
	
			$statement->execute();

			$accounts = $statement->fetchAll(PDO::FETCH_ASSOC);

			foreach($accounts as $accounts){
				$Account = new Account($accounts);
				$return[$Account->id] = $Account->GetValues();
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

AJAX::registerGetMethods("Account", array("Get", "Search"));
AJAX::registerPostMethods("Account", array("Create", "Update", "Delete"));