<?php

abstract class EventController {
	
	static public function Create() {
		AJAX::Response("json",  Event::Create(), 0, "COol");
	}

	static public function Get() {

	}

	static public function Update() {

	}

	static public function Delete() {

	}
}