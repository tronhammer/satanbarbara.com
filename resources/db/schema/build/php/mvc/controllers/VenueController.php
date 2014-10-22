<?php

abstract class VenueController extends BaseController {
	static protected $_target = "Venue";
	static protected $_key = "venues";

}

AJAX::registerGetMethods("Venue", array("Get", "Search", "Schema"));
AJAX::registerPostMethods("Venue", array("Create", "Update", "Delete"));