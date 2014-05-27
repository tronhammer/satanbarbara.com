<?php

abstract class EventController {
	
	static public function Create() {
		AJAXResponse::JSON( Event::Create(), 0, "COol");
	}

	static public function Get() {

	}

	static public function Update() {

	}

	static public function Delete() {

	}
}