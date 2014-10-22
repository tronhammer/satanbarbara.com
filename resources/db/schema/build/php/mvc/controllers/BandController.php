<?php

abstract class BandController extends BaseController {
	static protected $_target = "Band";
	static protected $_key = "bands";

}

AJAX::registerGetMethods("Band", array("Get", "Search", "Schema"));
AJAX::registerPostMethods("Band", array("Create", "Update", "Delete"));