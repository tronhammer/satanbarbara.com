DROP TABLE IF EXISTS `bands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`bands` (
	`origin` VARCHAR(255) NOT NULL,
	`archived` BOOLEAN NOT NULL,
	`description` VARCHAR(4000) NOT NULL,
	`last_active` TIMESTAMP NOT NULL,
	`created` TIMESTAMP NOT NULL COMMENT "Time when entry was made.",
	`deleted` BOOLEAN NOT NULL,
	`banned` BOOLEAN NOT NULL,
	`activated` BOOLEAN NOT NULL,
	`last_activated` TIMESTAMP NOT NULL COMMENT "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
	`last_modified` TIMESTAMP NOT NULL,
	`last_login` TIMESTAMP NOT NULL,
	`suspended` BOOLEAN NOT NULL,
	`active` ENUM("yes", "no") NOT NULL DEFAULT "yes",
	`id` INT(12) NOT NULL,
	`name` VARCHAR(255) NOT NULL,



	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;