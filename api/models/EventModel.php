<?php

abstract class EventModel {

	static public function Create($data) {
		$dbh = MySQLConnector::getHandle();

		$statement = $dbh->prepare("INSERT INTO `satanbarbara`.`events` (`created`, `creator_id`,`title`,`location`,`ages`,`venue`,`price`,`date`,`start_time`,`end_time`,`type_id`,`venue_type_id`, `genre_id`) values (NOW(),?,?,?,?,?,?,?,?,?,?,?,?);");

		if (!$statement->execute(array(
			1,
		    "Test BAABY",
		    "test place",
		    "18",
		    "house party waaat",
		    "12.50",
		    "2014-1-1 5:23:52PM",
		    "2014-1-1 5:23:52PM",
		    "2014-1-1 5:23:52PM",
		    1,
		    1,
		    1
		))){
			return $statement->errorInfo();
		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}
}