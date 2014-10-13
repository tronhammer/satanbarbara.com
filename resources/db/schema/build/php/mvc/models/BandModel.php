<?php

abstract class BandModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "bands";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = json_decode(

    "{u'origin': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 255, u'label': u'Origin', u'placeholder': u'Satans asshole', u'type': u'string', u'name': u'origin'}, u'archived': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Archived', u'placeholder': u'', u'name': u'archived'}, u'description': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 4000, u'label': u'Description', u'placeholder': u'The best..fffucken...metAL Band OUT!! there...', u'type': u'string', u'name': u'description'}, u'last_active': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'timestamp', u'label': u'Last active', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_active'}, u'created': {u'description': u'Time when entry was made.', u'generator': u'db', u'type': u'timestamp', u'required': True, u'label': u'Created', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'created'}, u'deleted': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Deleted', u'placeholder': u'0', u'name': u'deleted'}, u'banned': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Banned', u'placeholder': u'0', u'name': u'banned'}, u'activated': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Activated', u'placeholder': u'1', u'name': u'activated'}, u'last_activated': {u'description': u'Last time the band was reactivated after having been marked as suspended or disbanded/hiatus', u'generator': u'system', u'default': 0, u'type': u'timestamp', u'label': u'Activated', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_activated'}, u'last_modified': {u'description': u'', u'generator': u'system', u'default': u'', u'type': u'timestamp', u'label': u'Last modified', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_modified'}, u'last_login': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'timestamp', u'label': u'Last logged in', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_login'}, u'suspended': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Suspended', u'placeholder': u'0', u'name': u'suspended'}, u'active': {u'description': u'', u'generator': u'user', u'default': u'yes', u'label': u'Active', u'type': u'option', u'options': {u'yes': {u'position': 0, u'description': u'', u'type': u'string', u'name': u'yes', u'label': u'Yes'}, u'no': {u'position': 1, u'description': u'', u'type': u'string', u'name': u'no', u'label': u'No'}}, u'name': u'active'}, u'id': {u'description': u'', u'generator': u'db', u'incremented': True, u'required': True, u'label': u'Unique ID', u'unique': True, u'type': u'id', u'name': u'id'}, u'name': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 255, u'required': True, u'label': u'Name', u'placeholder': u'Chao Lux', u'type': u'string', u'name': u'name'}}"
    
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		"created"

		, "id"

		, "name"

	);

	static protected $userSettable = array(


		"origin"

		, "description"

		, "active"

		, "name"

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