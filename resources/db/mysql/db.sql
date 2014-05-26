CREATE DATABASE `satanbarbara` COLLATE = `utf8_unicode_ci`;

CREATE USER 'sbclient'@'localhost' IDENTIFIED BY 'sbmetal666';

GRANT USAGE ON `sbclient`.* TO 'op_perfaudit'@'localhost' IDENTIFIED BY 'sbmetal666';

GRANT ALL PRIVILEGES ON `satanbarbara`.* TO 'sbclient'@'localhost' IDENTIFIED BY 'sbmetal666';