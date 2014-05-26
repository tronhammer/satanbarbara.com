delimiter |

CREATE TRIGGER `before_insert_event_descriptors`
    BEFORE INSERT ON `satanbarbara`.`events` FOR EACH ROW
    BEGIN

        INSERT INTO `satanbarbara`.`descriptors` (`type`, `name`)
        	SELECT
    		    "event",
    		    (SELECT `name` FROM `descriptors` WHERE `id`=NEW.type_id);

        INSERT INTO `satanbarbara`.`descriptors` (`type`, `name`)
    	    SELECT
    		    "venue",
   		    	(SELECT `name` FROM `descriptors` WHERE `id`=NEW.venue_type_id);

        INSERT INTO `satanbarbara`.`descriptors` (`type`, `name`)
    	    SELECT
    		    "genre",
    		    (SELECT `name` FROM `descriptors` WHERE `id`=NEW.genre_id);

    END;
|

CREATE TRIGGER `after_insert_event_list`
    AFTER INSERT ON `satanbarbara`.`events` FOR EACH ROW
    BEGIN
        INSERT INTO `satanbarbara`.`eventlists` (`event`) VALUES (NEW.id);
    END;
|

delimiter ;