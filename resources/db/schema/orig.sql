-- MySQL dump 10.13  Distrib 5.5.38, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: satanbarbara
-- ------------------------------------------------------
-- Server version	5.5.38-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `fname` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Anon',
  `lname` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Coward',
  `nickname` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `tagline` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `privilege_level` enum('admin','moderator','user','proxy','root','anon','deamon','client') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `is_admin` tinyint(1) DEFAULT '0',
  `is_moderator` tinyint(1) DEFAULT '0',
  `is_user` tinyint(1) DEFAULT '1',
  `is_anon` tinyint(1) DEFAULT '0',
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_active` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_activated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activated` tinyint(1) NOT NULL DEFAULT '0',
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`email`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'admin','','Administrator','','','','admin@tronnet.me','0000-00-00 00:00:00','admin',1,0,1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','2014-10-08 08:29:25',0,0,0,0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bands`
--

DROP TABLE IF EXISTS `bands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `genre` int(11) NOT NULL,
  `members` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_active` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_activated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activated` tinyint(1) NOT NULL DEFAULT '0',
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bands`
--

LOCK TABLES `bands` WRITE;
/*!40000 ALTER TABLE `bands` DISABLE KEYS */;
/*!40000 ALTER TABLE `bands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descriptors`
--

DROP TABLE IF EXISTS `descriptors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `descriptors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` enum('base','genre','venue','act','event','band') COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uname` (`name`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descriptors`
--

LOCK TABLES `descriptors` WRITE;
/*!40000 ALTER TABLE `descriptors` DISABLE KEYS */;
INSERT INTO `descriptors` VALUES (1,'2014-10-08 08:31:38','base','genre','Music or band genre.',0),(2,'2014-10-08 08:31:38','base','venue','Place where an event is held.',0),(3,'2014-10-08 08:31:38','base','event','An event happening.',0),(4,'2014-10-08 08:31:38','base','band','An band at an event.',0),(5,'2014-10-08 08:31:38','base','act','An act at an event.',0);
/*!40000 ALTER TABLE `descriptors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creator_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `requirements` text COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `date_text` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ages` enum('all','18','21','not sure') COLLATE utf8_unicode_ci NOT NULL,
  `venue` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `venue_id` int(11) NOT NULL,
  `venue_type_id` int(11) NOT NULL,
  `price` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'not sure',
  `genre_id` int(11) NOT NULL,
  `map_uri` varchar(1028) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'https://maps.google.com/',
  `ticket_uri` varchar(1028) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'not sure',
  `promocode` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `acts` text COLLATE utf8_unicode_ci NOT NULL,
  `guests` text COLLATE utf8_unicode_ci NOT NULL,
  `actstotal` int(11) NOT NULL DEFAULT '0',
  `gueststotal` int(11) NOT NULL DEFAULT '0',
  `moved_id` int(11) NOT NULL,
  `canceled` tinyint(1) NOT NULL DEFAULT '0',
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (4,'2014-10-08 11:33:12',3,2,'Test again','For maor purposes','It could be really cool for a test!','Nothing','1234 sterrat lane, santa barbara, CA 93101','2014-10-20','October 20th, 2014 @ 7:30pm','2014-10-21 02:30:00','2014-10-20 08:00:00','21','The Crowded Coffin',1,1,'$18.50',2,'https://maps.google.com/','not sure','','[1,2,3]','[1,2,3]',3,100,0,0,0,0),(5,'2014-10-08 11:34:34',3,2,'The real test!','For maor purposes','It could be really cool for a test!','Nothing','1234 sterrat lane, santa barbara, CA 93101','2014-05-20','October 20th, 2014 @ 7:30pm','2014-05-21 02:30:00','2014-05-20 08:00:00','21','The Crowded Coffin',1,1,'$18.50',2,'https://maps.google.com/','not sure','','[1,2,3]','[1,2,3]',3,100,0,0,0,0),(6,'2014-10-08 11:35:32',3,2,'better...!','For maor purposes','It could be really cool for a test!','Nothing','1234 sterrat lane, santa barbara, CA 93101','2014-05-20','October 6th, 2014 @ 7:30pm','2014-06-21 02:30:00','2014-06-20 08:00:00','21','The Crowded Coffin',1,1,'$18.50',2,'https://maps.google.com/','not sure','','[1,2,3]','[1,2,3]',3,100,0,0,0,0),(7,'2014-10-08 11:36:25',3,2,'better...!','For maor purposes','It could be really cool for a test!','Nothing','1234 sterrat lane, santa barbara, CA 93101','2014-10-05','October 5th, 2014 @ 7:30pm','2014-10-06 02:30:00','2014-10-05 08:00:00','21','The Crowded Coffin',1,1,'$18.50',2,'https://maps.google.com/','not sure','','[1,2,3]','[1,2,3]',3,100,0,0,0,0),(8,'2014-10-08 11:37:00',3,2,'all the wins...!','For maor purposes','It could be really cool for a test!','Nothing','1234 sterrat lane, santa barbara, CA 93101','2014-10-06','October 6th, 2014 @ 7:30pm','2014-10-07 02:30:00','2014-10-06 08:00:00','21','The Crowded Coffin',1,1,'$18.50',2,'https://maps.google.com/','not sure','','[1,2,3]','[1,2,3]',3,100,0,0,0,0);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-10-10 19:19:28
