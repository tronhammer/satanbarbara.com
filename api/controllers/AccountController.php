<?php

abstract class AccountController {
	
	static public function Create() {
		AJAXResponse::JSON( Account::Create(), 0, "even better");
	}

	static public function Get() {

	}

	static public function Update() {

	}

	static public function Delete() {

	}
}