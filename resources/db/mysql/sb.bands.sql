CREATE TABLE IF NOT EXISTS `satanbarbara`.`bands` (
    `id` INT(11) NOT NULL AUTO_INCREMENT, 
    `created` TIMESTAMP NOT NULL DEFAULT NOW(),
    `name` VARCHAR(255) NOT NULL, 
    `genre` INT(11) NOT NULL, 
	`members` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`) 
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;