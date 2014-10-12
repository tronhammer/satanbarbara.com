<?php

abstract class EventModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "events";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(

    {u'archived': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Archived', u'placeholder': u'0', u'name': u'archived'}, u'promocode': {u'description': u'', u'generator': u'user', u'max': 64, u'label': u'Promocode', u'placeholder': u'IKICKASSFORTHELORD', u'type': u'string', u'name': u'promocode'}, u'subtitle': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 90, u'label': u'Subtitle', u'placeholder': u'B-Y-O-Bible', u'type': u'string', u'name': u'subtitle'}, u'description': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 4000, u'label': u'Description', u'placeholder': u'This is gonna be hot!', u'type': u'string', u'name': u'description'}, u'title': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 255, u'required': True, u'label': u'Title', u'placeholder': u'SBCMT Bible Burning', u'type': u'string', u'name': u'title'}, u'deleted': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Deleted', u'placeholder': u'0', u'name': u'deleted'}, u'ticket_uri': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 255, u'label': u'Ticket URL', u'placeholder': u'http://', u'type': u'string', u'name': u'ticket_uri'}, u'start_time': {u'description': u'', u'generator': u'user', u'type': u'timestamp', u'required': True, u'label': u'Start Time', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'start_time'}, u'created': {u'description': u'Time when entry was made.', u'generator': u'db', u'type': u'timestamp', u'required': True, u'label': u'Created', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'created'}, u'ages': {u'description': u'', u'generator': u'user', u'default': u'na', u'required': True, u'label': u'Ages', u'type': u'option', u'options': {u'18': {u'position': 1, u'description': u'', u'type': u'string', u'name': u'18', u'label': u'18+'}, u'all': {u'position': 0, u'description': u'', u'type': u'string', u'name': u'all', u'label': u'All'}, u'21': {u'position': 2, u'description': u'', u'type': u'string', u'name': u'21', u'label': u'21+'}, u'na': {u'position': 35, u'description': u'', u'type': u'string', u'name': u'na', u'label': u'Not Sure'}}, u'name': u'ages'}, u'price': {u'description': u'', u'generator': u'user', u'default': u'', u'type': u'string', u'required': True, u'label': u'Event Price', u'placeholder': u'$5', u'name': u'price'}, u'canceled': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Canceled', u'placeholder': u'0', u'name': u'canceled'}, u'last_modified': {u'description': u'', u'generator': u'system', u'default': u'', u'type': u'timestamp', u'label': u'Last modified', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_modified'}, u'end_time': {u'description': u'', u'generator': u'user', u'type': u'timestamp', u'required': True, u'label': u'End Time', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'end_time'}, u'date': {u'description': u'', u'generator': u'user', u'default': u'', u'type': u'date', u'required': True, u'label': u'Event Date', u'placeholder': u'2014-12-27', u'name': u'date'}, u'requirements': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 4000, u'label': u'Requirements', u'placeholder': u'At least 1 bible.', u'type': u'string', u'name': u'requirements'}, u'flyer_uri': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 255, u'label': u'Flyer', u'placeholder': u'http://', u'type': u'string', u'name': u'flyer_uri'}, u'id': {u'description': u'', u'generator': u'db', u'incremented': True, u'required': True, u'label': u'Unique ID', u'unique': True, u'type': u'id', u'name': u'id'}, u'date_text': {u'description': u'2014-11-25 04:34:00 pm', u'generator': u'system', u'max': 35, u'label': u'Date Full Text', u'placeholder': u'2014-11-25 04:34:00 pm', u'type': u'string', u'name': u'date_text'}}
    
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		archived, promocode, subtitle, description, title, deleted, ticket_uri, start_time, created, ages, price, canceled, last_modified, end_time, date, requirements, flyer_uri, id, date_text
	);

	static protected $userSettable = array(

		, , , , title, , , start_time, created, ages, price, , , end_time, date, , , id, 
	);

	/**
	 * Class Methods
	 */
	static public function Create($data) {
		$data["created"] = date("Y-m-d h:i:s A");
		
		self::Save($data);

		return array("good!");
	}

	static public function Validate($data) {
		switch($data["name"]){
			case "created":
				break;
		}

		return $data["value"];
	}
}