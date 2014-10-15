<?php

abstract class VenueController extends BaseController{
	static protected $_target = "Venue";

}

AJAX::registerGetMethods("Venue", array("Get", "Search", "Schema"));
AJAX::registerPostMethods("Venue", array("Create", "Update", "Delete"));