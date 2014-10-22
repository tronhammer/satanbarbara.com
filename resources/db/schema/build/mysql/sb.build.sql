
DROP DATABASE IF EXISTS `satanbarbara`;

GRANT USAGE ON *.* TO `sbproxy`@`localhost`;

DROP USER `sbproxy`@`localhost`;

CREATE DATABASE `satanbarbara` COLLATE = `utf8_unicode_ci`;

CREATE USER 'sbproxy'@'localhost' IDENTIFIED BY 'mdk29fc7zg16d51b';

GRANT USAGE ON `satanbarbara`.* TO 'sbproxy'@'localhost' IDENTIFIED BY 'mdk29fc7zg16d51b';

GRANT ALL PRIVILEGES ON `satanbarbara`.* TO 'sbproxy'@'localhost' IDENTIFIED BY 'mdk29fc7zg16d51b';

USE `satanbarbara`
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
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,


    	UNIQUE INDEX `uid` (`name`, `address`, `city`, `state`, `zip`),
    	UNIQUE INDEX `vid` (`address`, `city`, `state`, `zip`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
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
	`email` VARCHAR(255) NOT NULL,
	`lname` VARCHAR(128) NOT NULL,
	`privilege_level` ENUM("admin", "moderator", "client", "user", "deamon", "root", "proxy") NOT NULL DEFAULT "user",
	`last_activated` TIMESTAMP NOT NULL COMMENT "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
	`last_modified` TIMESTAMP NOT NULL,
	`last_login` TIMESTAMP NOT NULL,
	`suspended` BOOLEAN NOT NULL,
	`fname` VARCHAR(128) NOT NULL,
	`password` VARCHAR(128) NOT NULL COMMENT "Case sensitive password for authenticating the Account object.",
	`nickname` VARCHAR(64) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "Exists as a unique identifier for Account objects in both the database and program layer.",


    	UNIQUE INDEX `uid` (`email`, `username`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
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
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,



	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`events` (
	`archived` BOOLEAN NOT NULL,
	`subtitle` VARCHAR(90) NOT NULL,
	`description` VARCHAR(4000) NOT NULL,
	`title` VARCHAR(255) NOT NULL,
	`deleted` BOOLEAN NOT NULL,
	`ticket_uri` VARCHAR(255) NOT NULL,
	`start_time` TIMESTAMP NOT NULL,
	`promocode` VARCHAR(64) NOT NULL,
	`ages` ENUM("18", "all", "21", "na") NOT NULL DEFAULT "na",
	`created` TIMESTAMP NOT NULL COMMENT "Time when entry was made.",
	`price` VARCHAR(255) NOT NULL,
	`canceled` BOOLEAN NOT NULL,
	`last_modified` TIMESTAMP NOT NULL,
	`end_time` TIMESTAMP NOT NULL,
	`date` DATE NOT NULL,
	`requirements` VARCHAR(4000) NOT NULL,
	`flyer_uri` VARCHAR(255) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`date_text` VARCHAR(35) NOT NULL COMMENT "2014-11-25",



	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `bandCreator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`bandCreator` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `bands`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `bandMember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`bandMember` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `bands`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `bandGenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`bandGenre` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `descriptors`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `bands`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `venueOwner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`venueOwner` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `venues`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `venueTag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`venueTag` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `descriptors`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `venues`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `venueCreator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`venueCreator` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `venues`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `eventBand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`eventBand` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `bands`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `eventVenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`eventVenue` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `venues`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `eventCreator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`eventCreator` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `eventGenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`eventGenre` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `descriptors`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `eventAttendee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `satanbarbara`.`eventAttendee` (
	`to` INT(12) NOT NULL,
	`from` INT(12) NOT NULL,
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`created` TIMESTAMP NOT NULL DEFAULT NOW(),

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` (`from`, `to`),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `satanbarbara`.`descriptors` WRITE;
/*!40000 ALTER TABLE `descriptors` DISABLE KEYS */;
	INSERT INTO `satanbarbara`.`descriptors` (`archived`, `description`, `created`, `name`) VALUES ("0", "SO awesome!", "2014-11-25 04:34:00 pm", "awesome");
/*!40000 ALTER TABLE `descriptors` ENABLE KEYS */;
UNLOCK TABLES;
LOCK TABLES `satanbarbara`.`accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
	INSERT INTO `satanbarbara`.`accounts` (`username`, `archived`, `description`, `last_active`, `created`, `deleted`, `tagline`, `banned`, `activated`, `email`, `lname`, `last_activated`, `last_modified`, `last_login`, `suspended`, `fname`, `password`, `nickname`) VALUES ("tronhammer", "0", "I'm freaken tron man! Get with it.", "2014-11-25 04:34:00 pm", "2014-11-25 04:34:00 pm", "0", "I've eaten uglier women than you for breakfast.", "0", "1", "tron@tronnet.me", "Hammer", "2014-11-25 04:34:00 pm", "2014-11-25 04:34:00 pm", "2014-11-25 04:34:00 pm", "0", "Tron", "666SatanForPrez", "TRONHAMBURGER");
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
LOCK TABLES `satanbarbara`.`venues` WRITE;
/*!40000 ALTER TABLE `venues` DISABLE KEYS */;
	INSERT INTO `satanbarbara`.`venues` (`city`, `archived`, `slogan`, `description`, `zip`, `created`, `deleted`, `requirements`, `uri`, `state`, `last_modified`, `address`, `capacity`, `name`) VALUES ("Satan Barbara", "0", "Fuck it", "Where you go to get your freak on.", "93101", "2014-11-25 04:34:00 pm", "0", "At least 1 bible.", "http://", "CA", "2014-11-25 04:34:00 pm", "666 Hell-yeah", "400", "CrowdedCoffin");
/*!40000 ALTER TABLE `venues` ENABLE KEYS */;
UNLOCK TABLES;
LOCK TABLES `satanbarbara`.`events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
	INSERT INTO `satanbarbara`.`events` (`archived`, `subtitle`, `description`, `title`, `deleted`, `ticket_uri`, `start_time`, `promocode`, `created`, `price`, `canceled`, `last_modified`, `end_time`, `date`, `requirements`, `flyer_uri`, `date_text`) VALUES ("0", "B-Y-O-Bible", "This is gonna be hot!", "SBCMT Bible Burning", "0", "http://", "2014-11-25 04:34:00 pm", "IKICKASSFORTHELORD", "2014-11-25 04:34:00 pm", "$5", "0", "2014-11-25 04:34:00 pm", "2014-11-25 11:34:00 pm", "2014-12-27", "At least 1 bible.", "http://", "2014-11-25");
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
LOCK TABLES `satanbarbara`.`bands` WRITE;
/*!40000 ALTER TABLE `bands` DISABLE KEYS */;
	INSERT INTO `satanbarbara`.`bands` (`origin`, `description`, `last_active`, `created`, `deleted`, `banned`, `activated`, `last_activated`, `last_modified`, `last_login`, `suspended`, `name`) VALUES ("Satans asshole", "The best..fffucken...metAL Band OUT!! there...", "2014-11-25 04:34:00 pm", "2014-11-25 04:34:00 pm", "0", "0", "1", "2014-11-25 04:34:00 pm", "2014-11-25 04:34:00 pm", "2014-11-25 04:34:00 pm", "0", "Chao Lux");
/*!40000 ALTER TABLE `bands` ENABLE KEYS */;
UNLOCK TABLES;
