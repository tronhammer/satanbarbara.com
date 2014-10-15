DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`accounts` (
	`username` VARCHAR(32) NOT NULL COMMENT "Login name for the Account object.",
	`archived` BOOLEAN NOT NULL,
	`description` VARCHAR(4000) NOT NULL,
	`last_active` TIMESTAMP NOT NULL,
	`created` TIMESTAMP NOT NULL COMMENT "Time when entry was made in the database.",
	`deleted` BOOLEAN NOT NULL,
	`tagline` VARCHAR(128) NOT NULL,
	`banned` BOOLEAN NOT NULL,
	`activated` BOOLEAN NOT NULL,
	`suspended` BOOLEAN NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`lname` VARCHAR(128) NOT NULL,
	`privilege_level` ENUM("admin", "moderator", "client", "user", "deamon", "root", "proxy") NOT NULL DEFAULT "user",
	`last_activated` TIMESTAMP NOT NULL COMMENT "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
	`last_modified` TIMESTAMP NOT NULL,
	`last_login` TIMESTAMP NOT NULL,
	`fname` VARCHAR(128) NOT NULL,
	`password` VARCHAR(128) NOT NULL COMMENT "Case sensitive password for authenticating the Account object.",
	`nickname` VARCHAR(64) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "Exists as a unique identifier for Account objects in both the database and program layer.",


    	UNIQUE INDEX `uid` (`email`, `username`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;