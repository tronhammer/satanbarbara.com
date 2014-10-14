<?php
/**
 * @brief MySQL Connector
 */

abstract class MySQLConnector {

 	static private $_credentialsPath = "./../../resources/db/mysql/db.credentials.json";
 	static private $_dbh;

	private static function _connect() {
		$credentials = json_decode(file_get_contents( dirname(__FILE__) ."/". MySQLConnector::$_credentialsPath), true);
		try {
			$dbh = MySQLConnector::$_dbh = new PDO(
				"mysql:host=". $credentials["creds"]["host"] .";dbname=". $credentials["creds"]["db"], 
				$credentials["creds"]["username"], 
				$credentials["creds"]["password"]
			);
		} catch (PDOException $e) {
			/** 
			 * @todo Use primary logging system.
			 */
		    error_log("Connection failed: " . $e->getMessage());
		    throw new Exception("MySQL failed to connect: " . $e->getMessage());
		}

		return $dbh;
	}

	public static function getHandle() {
		return (!isset(MySQLConnector::$_dbh)) ? self::_connect() : self::$_dbh;
	}
}