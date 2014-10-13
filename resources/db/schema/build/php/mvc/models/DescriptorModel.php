<?php

abstract class DescriptorModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "descriptors";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = json_decode(

    "{u'archived': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Archived', u'placeholder': u'0', u'name': u'archived'}, u'description': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 4000, u'label': u'Description', u'placeholder': u'SO awesome!', u'type': u'string', u'name': u'description'}, u'created': {u'description': u'Time when entry was made.', u'generator': u'db', u'type': u'timestamp', u'required': True, u'label': u'Created', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'created'}, u'deleted': {u'description': u'0', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Deleted', u'placeholder': u'', u'name': u'deleted'}, u'id': {u'description': u'', u'generator': u'db', u'incremented': True, u'required': True, u'label': u'Unique ID', u'unique': True, u'type': u'id', u'name': u'id'}, u'name': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 255, u'required': True, u'label': u'Name', u'placeholder': u'awesome', u'unique': True, u'type': u'string', u'name': u'name'}}"
    
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		"created"

		, "id"

		, "name"

	);

	static protected $userSettable = array(


		"description"

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