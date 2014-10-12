DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`events` (
	`archived` BOOLEAN NOT NULL,
	`promocode` VARCHAR(64) NOT NULL,
	`subtitle` VARCHAR(90) NOT NULL,
	`description` VARCHAR(4000) NOT NULL,
	`title` VARCHAR(255) NOT NULL,
	`deleted` BOOLEAN NOT NULL,
	`ticket_uri` VARCHAR(255) NOT NULL,
	`start_time` TIMESTAMP NOT NULL,
	`created` TIMESTAMP NOT NULL COMMENT "Time when entry was made.",
	`ages` ENUM("18", "all", "21", "na") NOT NULL DEFAULT "na",
	`price` VARCHAR(255) NOT NULL,
	`canceled` BOOLEAN NOT NULL,
	`last_modified` TIMESTAMP NOT NULL,
	`end_time` TIMESTAMP NOT NULL,
	`date` DATE NOT NULL,
	`requirements` VARCHAR(4000) NOT NULL,
	`flyer_uri` VARCHAR(255) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`date_text` VARCHAR(35) NOT NULL COMMENT "2014-11-25 04:34:00 pm",



	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;