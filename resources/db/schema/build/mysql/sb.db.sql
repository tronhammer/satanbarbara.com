DROP DATABASE IF EXISTS `satanbarbara`;

GRANT USAGE ON *.* TO `sbproxy`@`localhost`;

DROP USER `sbproxy`@`localhost`;

CREATE DATABASE `satanbarbara` COLLATE = `utf8_unicode_ci`;

CREATE USER 'sbproxy'@'localhost' IDENTIFIED BY 'mdk29fc7zg16d51b';

GRANT USAGE ON `satanbarbara`.* TO 'sbproxy'@'localhost' IDENTIFIED BY 'mdk29fc7zg16d51b';

GRANT ALL PRIVILEGES ON `satanbarbara`.* TO 'sbproxy'@'localhost' IDENTIFIED BY 'mdk29fc7zg16d51b';

USE `satanbarbara`