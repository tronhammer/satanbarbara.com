CREATE DATABASE `satanbarbara` COLLATE = `utf8_unicode_ci`;

CREATE TABLE IF NOT EXISTS `satanbarbara`.`accounts` (
    `id` INT(11) NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR(255) NOT NULL, 
    `email` VARCHAR(255) NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`id`) 
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;

CREATE USER 'satanbarbara'@'localhost' IDENTIFIED BY 'iwilldie';

GRANT USAGE ON `satanbarbara`.* TO 'satanbarbara'@'localhost' IDENTIFIED BY 'iwilldie';

GRANT ALL PRIVILEGES ON `satanbarbara`.* TO 'satanbarbara'@'localhost' IDENTIFIED BY 'iwilldie';