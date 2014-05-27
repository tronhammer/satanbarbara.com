CREATE TABLE IF NOT EXISTS `satanbarbara`.`eventlists` (
    `id` INT(11) NOT NULL AUTO_INCREMENT, 
    `created` TIMESTAMP NOT NULL DEFAULT NOW(),
    `event` INT(11) NOT NULL, 
    `acts` TEXT NOT NULL DEFAULT "", 
	`guests` TEXT NOT NULL DEFAULT "",
    `actstotal` INT(11) NOT NULL DEFAULT 0,
    `gueststotal` INT(11) NOT NULL DEFAULT 0,
    `deleted` BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) 
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;