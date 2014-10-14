<?php

abstract class AccountModel extends BaseModel {

    /**@* {String} Name of database. */
	const _DATABASE = "satanbarbara";

    /**@* {String} Name of table in the database. */
    const _TABLE = "accounts";

    /**@* {Array} Used as a means of validating and sanitizing object properties before they reach the database. */
    static protected $attrs = array(
        "id"=>"is_numeric",
        "created"=>"empty",
        "username"=>"is_string",
        "password"=>"is_string",
        "fname"=>"is_string",
        "lname"=>"is_string",
        "nickname"=>"is_string",
        "tagline"=>"is_string",
        "email"=>"is_string",
        "privilege_level"=>"is_string",
        "is_admin"=>"is_bool",
	    "is_moderator"=>"is_bool",
	    "is_user"=>"is_bool",
	    "is_anon"=>"is_bool",
	    "last_login"=>"is_string",
	    "last_active"=>"is_string",
	    "last_activated"=>"is_string",
	    "last_modified"=>"is_string",
	    "activated"=>"is_bool",
	    "suspended"=>"is_bool",
	    "banned"=>"is_bool",
	    "deleted"=>"is_bool"
    );

    /**@* {Array} Defines which fields are required for an entry. */
	static protected $required = array("created", "username", "password", "fname", "lname", "email");

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