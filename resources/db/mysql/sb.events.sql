CREATE TABLE IF NOT EXISTS `satanbarbara`.`events` (
    `id` INT(11) NOT NULL AUTO_INCREMENT, 
    `created` TIMESTAMP NOT NULL DEFAULT NOW(),
    `creator_id` INT(11) NOT NULL,
    `type_id` INT(11) NOT NULL,
    `title` VARCHAR(255) NOT NULL, 
    `subtitle` VARCHAR(255) NOT NULL DEFAULT "", 
    `description` TEXT NOT NULL DEFAULT "", 
    `location` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `start_time` TIMESTAMP NOT NULL,
    `end_time` TIMESTAMP NOT NULL,
    `ages` ENUM("all", "18", "21", "not sure") NOT NULL,
    `venue` VARCHAR(255) NOT NULL,
    `venue_type_id` INT(11) NOT NULL,
    `price` VARCHAR(128) NOT NULL DEFAULT "not sure",
    `genre_id` INT(11) NOT NULL,
    `eventlist_id` INT(11) NOT NULL,
    `map_uri` VARCHAR(1028) NOT NULL DEFAULT "https://maps.google.com/",
    `ticket_uri` VARCHAR(1028) NOT NULL DEFAULT "not sure",
    `promocode` VARCHAR(128) NOT NULL DEFAULT "",
    `archived` BOOLEAN NOT NULL DEFAULT 0,
    `deleted` BOOLEAN NOT NULL DEFAULT 0,

    FOREIGN KEY (`creator_id`) REFERENCES `accounts`(`id`),

    FOREIGN KEY (`type_id`) REFERENCES `descriptors`(`id`),
    FOREIGN KEY (`venue_type_id`) REFERENCES `descriptors`(`id`),
    FOREIGN KEY (`genre_id`) REFERENCES `descriptors`(`id`),

    PRIMARY KEY (`id`)

) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;

INSERT INTO `satanbarbara`.`events` (
    `creator_id`,
    `title`,
    `location`,
    `ages`,
    `venue`,
    `price`,
    `date`,
    `start_time`,
    `end_time`,
    `type_id`,
    `venue_type_id`,
    `genre_id`
) values (
    1,
    "Test",
    "test place",
    "18",
    "house party",
    "12.50",
    NOW(),
    NOW(),
    NOW(),
    1,
    1,
    1
);