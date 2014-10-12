<?php

abstract class AccountModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "accounts";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(

    {u'username': {u'description': u'Login name for the Account object.', u'generator': u'user', u'min': 3, u'default': u'', u'max': 32, u'required': True, u'label': u'Username', u'placeholder': u'tronhammer', u'type': u'string', u'name': u'username'}, u'archived': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Archived', u'placeholder': u'0', u'name': u'archived'}, u'description': {u'description': u'', u'generator': u'user', u'default': u'', u'max': 4000, u'label': u'Description', u'placeholder': u"I'm freaken tron man! Get with it.", u'type': u'string', u'name': u'description'}, u'last_active': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'timestamp', u'label': u'Last active', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_active'}, u'created': {u'description': u'Time when entry was made in the database.', u'generator': u'db', u'type': u'timestamp', u'required': True, u'label': u'Created', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'created'}, u'deleted': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Deleted', u'placeholder': u'0', u'name': u'deleted'}, u'tagline': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 128, u'label': u'Tagline', u'placeholder': u"I've eaten uglier women than you for breakfast.", u'type': u'string', u'name': u'tagline'}, u'banned': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Banned', u'placeholder': u'0', u'name': u'banned'}, u'activated': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Activated', u'placeholder': u'1', u'name': u'activated'}, u'suspended': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'boolean', u'label': u'Suspended', u'placeholder': u'0', u'name': u'suspended'}, u'email': {u'description': u'', u'generator': u'user', u'min': 9, u'default': u'', u'max': 255, u'label': u'Email', u'placeholder': u'tron@tronnet.me', u'type': u'string', u'name': u'email'}, u'lname': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 128, u'label': u'Last Name', u'placeholder': u'Hammer', u'type': u'string', u'name': u'lname'}, u'privilege_level': {u'description': u'', u'generator': u'system', u'default': u'user', u'required': True, u'label': u'Privilege Level', u'type': u'option', u'options': {u'admin': {u'position': 0, u'description': u'', u'type': u'string', u'name': u'admin', u'label': u'Administrator'}, u'moderator': {u'position': 1, u'description': u'', u'type': u'string', u'name': u'moderator', u'label': u'Moderator'}, u'client': {u'position': 6, u'description': u'', u'type': u'string', u'name': u'client', u'label': u'Client'}, u'user': {u'position': 2, u'description': u'', u'type': u'string', u'name': u'user', u'label': u'User'}, u'deamon': {u'position': 5, u'description': u'', u'type': u'string', u'name': u'deamon', u'label': u'Deamon'}, u'root': {u'position': 4, u'description': u'', u'type': u'string', u'name': u'root', u'label': u'Root'}, u'proxy': {u'position': 3, u'description': u'', u'type': u'string', u'name': u'na', u'label': u'Not Sure'}}, u'name': u'privilege_level'}, u'last_activated': {u'description': u'Last time the band was reactivated after having been marked as suspended or disbanded/hiatus', u'generator': u'system', u'default': 0, u'type': u'timestamp', u'label': u'Activated', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_activated'}, u'last_modified': {u'description': u'', u'generator': u'system', u'default': u'', u'type': u'timestamp', u'label': u'Last modified', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_modified'}, u'last_login': {u'description': u'', u'generator': u'system', u'default': 0, u'type': u'timestamp', u'label': u'Last logged in', u'placeholder': u'2014-11-25 04:34:00 pm', u'name': u'last_login'}, u'fname': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 128, u'required': True, u'label': u'First Name', u'placeholder': u'Tron', u'type': u'string', u'name': u'fname'}, u'password': {u'description': u'Case sensitive password for authenticating the Account object.', u'generator': u'user', u'min': 6, u'default': u'', u'max': 128, u'required': True, u'label': u'Password', u'placeholder': u'666SatanForPrez', u'type': u'string', u'name': u'password'}, u'nickname': {u'description': u'', u'generator': u'user', u'min': 3, u'default': u'', u'max': 64, u'label': u'Nickname', u'placeholder': u'TRONHAMBURGER', u'type': u'string', u'name': u'nickname'}, u'id': {u'description': u'Exists as a unique identifier for Account objects in both the database and program layer.', u'generator': u'db', u'incremented': True, u'required': True, u'label': u'Unique ID', u'unique': True, u'type': u'id', u'name': u'id'}}
    
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array(

		username, archived, description, last_active, created, deleted, tagline, banned, activated, suspended, email, lname, privilege_level, last_activated, last_modified, last_login, fname, password, nickname, id
	);

	static protected $userSettable = array(

		username, , , , created, , , , , , , , privilege_level, , , , fname, password, , id
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