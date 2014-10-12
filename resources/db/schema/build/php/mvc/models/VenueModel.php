<?php

abstract class VenueModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "venues";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(

    {u'city': {u'description': u'', u'generator': u'user', u'max': 90, u'required': True, u'label': u'City', u'placeholder': u'Satan Barbara', u'type': u'string', u'name': u'city'}, u'archived': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Archived', u'placeholder': u'0', u'name': u'archived'}, u'slogan': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 90, u'label': u'Slogan', u'placeholder': u'Fuck it', u'type': u'string', u'name': u'slogan'}, u'description': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 4000, u'label': u'Description', u'placeholder': u'Where you go to get your freak on.', u'type': u'string', u'name': u'description'}, u'zip': {u'description': u'', u'generator': u'user', u'min': 5, u'max': 12, u'required': True, u'label': u'Postal Code', u'placeholder': u'93101', u'type': u'string', u'name': u'zip'}, u'created': {u'description': u'Time when entry was made.', u'generator': u'db', u'type': u'timestamp', u'required': True, u'label': u'Created', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'created'}, u'deleted': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Deleted', u'placeholder': u'0', u'name': u'deleted'}, u'requirements': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 4000, u'label': u'Requirements', u'placeholder': u'At least 1 bible.', u'type': u'string', u'name': u'requirements'}, u'uri': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 255, u'label': u'Website', u'placeholder': u'http://', u'type': u'string', u'name': u'uri'}, u'state': {u'description': u'', u'generator': u'user', u'max': 2, u'required': True, u'label': u'State', u'placeholder': u'CA', u'type': u'string', u'name': u'state'}, u'last_modified': {u'description': u'', u'generator': u'system', u'default': u'', u'type': u'timestamp', u'label': u'Last modified', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_modified'}, u'address': {u'description': u'', u'generator': u'user', u'max': 255, u'required': True, u'label': u'Address', u'placeholder': u'666 Hell-yeah', u'type': u'string', u'name': u'address'}, u'capacity': {u'description': u'400', u'generator': u'user', u'type': u'integer', u'label': u'Capacity', u'placeholder': u'400', u'name': u'capacity'}, u'id': {u'description': u'', u'generator': u'db', u'incremented': True, u'required': True, u'label': u'Unique ID', u'unique': True, u'type': u'id', u'name': u'id'}, u'name': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 255, u'required': True, u'label': u'Name', u'placeholder': u'CrowdedCoffin', u'type': u'string', u'name': u'name'}}
    
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		city, archived, slogan, description, zip, created, deleted, requirements, uri, state, last_modified, address, capacity, id, name
	);

	static protected $userSettable = array(

		city, , , , zip, created, , , , state, , address, , id, name
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