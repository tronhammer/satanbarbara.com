DROP TABLE IF EXISTS `bandMember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`bandMember` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `bands`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;