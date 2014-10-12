CREATE TABLE IF NOT EXISTS `satanbarbara`.`associations` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `type` ENUM("attending", "creator") NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT NOW(),
    `account_id` INT(11) NOT NULL,
    `venue_id` INT(11) NOT NULL,
    `event_id` INT(11) NOT NULL,
    `band_id` INT(11) NOT NULL,
    `descriptor_id` INT(11) NOT NULL,

    FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`),
    FOREIGN KEY (`venue_id`) REFERENCES `venues`(`id`),
    FOREIGN KEY (`event_id`) REFERENCES `events`(`id`),
    FOREIGN KEY (`band_id`) REFERENCES `bands`(`id`),
    FOREIGN KEY (`descriptor`) REFERENCES `descriptors`(`id`),

    PRIMARY KEY (`id`)

) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;