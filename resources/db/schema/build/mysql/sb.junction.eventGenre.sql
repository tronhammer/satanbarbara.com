DROP TABLE IF EXISTS `eventGenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`eventGenre` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `descriptors`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;