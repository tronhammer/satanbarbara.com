CREATE TABLE IF NOT EXISTS `satanbarbara`.`descriptors` (
    `id` INT(11) NOT NULL AUTO_INCREMENT, 
    `created` TIMESTAMP NOT NULL DEFAULT NOW(),
    `type` ENUM("base", "genre", "venue", "act", "event", "band") NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    UNIQUE  INDEX `uname` (`name`, `type`),
    PRIMARY KEY (`id`) 
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;

INSERT INTO `satanbarbara`.`descriptors` (`type`, `name`, `description`) VALUES ("base", "genre", "Music or band genre.");
INSERT INTO `satanbarbara`.`descriptors` (`type`, `name`, `description`) VALUES ("base", "venue", "Place where an event is held.");
INSERT INTO `satanbarbara`.`descriptors` (`type`, `name`, `description`) VALUES ("base", "event", "An event happening.");
INSERT INTO `satanbarbara`.`descriptors` (`type`, `name`, `description`) VALUES ("base", "band", "An band at an event.");
INSERT INTO `satanbarbara`.`descriptors` (`type`, `name`, `description`) VALUES ("base", "act", "An act at an event.");