DROP TABLE IF EXISTS `descriptors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`descriptors` (
	`archived` BOOLEAN NOT NULL,
	`description` VARCHAR(4000) NOT NULL,
	`created` TIMESTAMP NOT NULL COMMENT "Time when entry was made.",
	`deleted` BOOLEAN NOT NULL COMMENT "0",
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,


    	UNIQUE INDEX `uid` (`name`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;