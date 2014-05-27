CREATE TABLE IF NOT EXISTS `satanbarbara`.`accounts` (
    `id` INT(11) NOT NULL AUTO_INCREMENT, 
    `username` VARCHAR(32) NOT NULL,
    `fname` VARCHAR(128) NOT NULL DEFAULT "Anon", 
    `lname` VARCHAR(128) NOT NULL DEFAULT "Coward",
    `nickname` VARCHAR(64) NOT NULL DEFAULT "",
    `tagline` VARCHAR(128) NOT NULL DEFAULT "",
    `email` VARCHAR(255) NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT 0,
    `privilege_level` ENUM("admin", "moderator", "user", "proxy", "root", "anon", "deamon", "client") NOT NULL DEFAULT "user",
    `is_admin` BOOLEAN DEFAULT 0,
    `is_moderator` BOOLEAN DEFAULT 0,
    `is_user` BOOLEAN DEFAULT 1,
    `is_anon` BOOLEAN DEFAULT 0,
    `last_login` TIMESTAMP NOT NULL DEFAULT 0,
    `last_active` TIMESTAMP NOT NULL DEFAULT 0,
    `last_activated` TIMESTAMP NOT NULL DEFAULT 0,
    `last_modified` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
    `activated` BOOLEAN NOT NULL DEFAULT 0,
    `suspended` BOOLEAN NOT NULL DEFAULT 0,
    `banned` BOOLEAN NOT NULL DEFAULT 0,
    `deleted` BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) 
) ENGINE=`InnoDB` DEFAULT CHARSET=`utf8` COLLATE=`utf8_unicode_ci` AUTO_INCREMENT=1;

INSERT INTO `satanbarbara`.`accounts` (
    `username`,
    `email`,
    `fname`,
    `lname`,
    `privilege_level`,
    `is_admin`
) values (
    "admin",
    "admin@tronnet.me",
    "Administrator",
   	"",
    "admin",
    1
);