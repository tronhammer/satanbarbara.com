CREATE TABLE IF NOT EXISTS `satanbarbara`.`descriptors` (
	`archived` BOOLEAN NOT NULL COMMENT "",
	`description` VARCHAR(4000) NOT NULL COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "Time when entry was made.",
	`deleted` BOOLEAN NOT NULL COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`name` VARCHAR(255) NOT NULL COMMENT "",


    	UNIQUE INDEX `uid` ("name"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`venues` (
	`city` VARCHAR(90) NOT NULL COMMENT "",
	`slogan` VARCHAR(90) NOT NULL COMMENT "",
	`description` VARCHAR(4000) NOT NULL COMMENT "",
	`zip` VARCHAR(12) NOT NULL COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "Time when entry was made.",
	`requirements` VARCHAR(4000) NOT NULL COMMENT "",
	`uri` VARCHAR(255) NOT NULL COMMENT "",
	`state` VARCHAR(2) NOT NULL COMMENT "",
	`address` VARCHAR(255) NOT NULL COMMENT "",
	`capacity` INT(12) NOT NULL COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`name` VARCHAR(255) NOT NULL COMMENT "",


    	UNIQUE INDEX `uid` ("name", "address", "city", "state", "zip"),
    	UNIQUE INDEX `vid` ("address", "city", "state", "zip"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`accounts` (
	`username` VARCHAR(32) NOT NULL COMMENT "",
	`archived` BOOLEAN NOT NULL COMMENT "",
	`description` VARCHAR(4000) NOT NULL COMMENT "",
	`last_active` TIMESTAMP NOT NULL COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "Time when entry was made.",
	`deleted` BOOLEAN NOT NULL COMMENT "",
	`tagline` VARCHAR(128) NOT NULL COMMENT "",
	`banned` BOOLEAN NOT NULL COMMENT "",
	`activated` BOOLEAN NOT NULL COMMENT "",
	`suspended` BOOLEAN NOT NULL COMMENT "",
	`email` VARCHAR(255) NOT NULL COMMENT "",
	`lname` VARCHAR(128) NOT NULL COMMENT "",
	`privilege_level` ENUM("admin", "moderator", "client", "user", "deamon", "root", "proxy") NOT NULL DEFAULT "user" COMMENT "",
	`last_activated` TIMESTAMP NOT NULL COMMENT "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
	`last_modified` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT "",
	`last_login` TIMESTAMP NOT NULL COMMENT "",
	`fname` VARCHAR(128) NOT NULL COMMENT "",
	`password` VARCHAR(128) NOT NULL COMMENT "",
	`nickname` VARCHAR(64) NOT NULL COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",


    	UNIQUE INDEX `uid` ("email", "username"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`bands` (
	`origin` VARCHAR(255) NOT NULL COMMENT "",
	`archived` BOOLEAN NOT NULL COMMENT "",
	`description` VARCHAR(4000) NOT NULL COMMENT "",
	`last_active` TIMESTAMP NOT NULL COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "Time when entry was made.",
	`deleted` BOOLEAN NOT NULL COMMENT "",
	`banned` BOOLEAN NOT NULL COMMENT "",
	`activated` BOOLEAN NOT NULL COMMENT "",
	`last_activated` TIMESTAMP NOT NULL COMMENT "Last time the band was reactivated after having been marked as suspended or disbanded/hiatus",
	`last_modified` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT "",
	`last_login` TIMESTAMP NOT NULL COMMENT "",
	`suspended` BOOLEAN NOT NULL COMMENT "",
	`active` ENUM("yes", "no") NOT NULL DEFAULT "yes" COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`title` VARCHAR(255) NOT NULL COMMENT "",



	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`events` (
	`archived` BOOLEAN NOT NULL COMMENT "",
	`promocode` VARCHAR(64) NOT NULL COMMENT "",
	`subtitle` VARCHAR(90) NOT NULL COMMENT "",
	`description` VARCHAR(4000) NOT NULL COMMENT "",
	`title` VARCHAR(255) NOT NULL COMMENT "",
	`deleted` BOOLEAN NOT NULL COMMENT "",
	`ticket_uri` VARCHAR(255) NOT NULL COMMENT "",
	`start_time` TIMESTAMP NOT NULL COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "Time when entry was made.",
	`ages` ENUM("18", "all", "21", "na") NOT NULL DEFAULT "na" COMMENT "",
	`price` VARCHAR(255) NOT NULL COMMENT "",
	`canceled` BOOLEAN NOT NULL COMMENT "",
	`last_modified` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT "",
	`end_time` TIMESTAMP NOT NULL COMMENT "",
	`date` DATE NOT NULL COMMENT "",
	`requirements` VARCHAR(4000) NOT NULL COMMENT "",
	`flyer_uri` VARCHAR(255) NOT NULL COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`date_text` VARCHAR(35) NOT NULL COMMENT "",


    	UNIQUE INDEX `uid` ("email", "username"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
[u'Descriptor', u'Account', u'Venue', u'Event', u'Band']
CREATE TABLE IF NOT EXISTS `satanbarbara`.`bandCreator` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `bands`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`bandMember` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `bands`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`bandGenre` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `descriptors`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `bands`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`venueOwner` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `venues`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`venueCreator` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `venues`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`eventBand` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `bands`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`eventVenue` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `venues`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`eventCreator` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`eventGenre` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `descriptors`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `satanbarbara`.`eventAttendee` (
	`to` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`from` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`id` INT(12) NOT NULL AUTO_INCREMENT COMMENT "",
	`created` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT "",

    	FOREIGN KEY (`to`) REFERENCES `accounts`(`id`),
    	FOREIGN KEY (`from`) REFERENCES `events`(`id`),

    	UNIQUE INDEX `uid` ("from", "to"),

	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;
