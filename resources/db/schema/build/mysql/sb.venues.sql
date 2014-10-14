DROP TABLE IF EXISTS `venues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`venues` (
	`city` VARCHAR(90) NOT NULL,
	`archived` BOOLEAN NOT NULL,
	`slogan` VARCHAR(90) NOT NULL,
	`description` VARCHAR(4000) NOT NULL,
	`zip` VARCHAR(12) NOT NULL,
	`created` TIMESTAMP NOT NULL COMMENT "Time when entry was made.",
	`deleted` BOOLEAN NOT NULL,
	`requirements` VARCHAR(4000) NOT NULL,
	`uri` VARCHAR(255) NOT NULL,
	`state` VARCHAR(2) NOT NULL,
	`last_modified` TIMESTAMP NOT NULL,
	`address` VARCHAR(255) NOT NULL,
	`capacity` INT(12) NOT NULL COMMENT "400",
	`id` INT(12) NOT NULL,
	`name` VARCHAR(255) NOT NULL,


    	UNIQUE INDEX `uid` (`name`, `address`, `city`, `state`, `zip`),
    	UNIQUE INDEX `vid` (`address`, `city`, `state`, `zip`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;