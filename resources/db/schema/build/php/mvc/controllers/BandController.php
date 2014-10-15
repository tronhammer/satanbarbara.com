<?php

abstract class BandController extends BaseController{
	static protected $_target = "Band";

}

AJAX::registerGetMethods("Band", array("Get", "Search", "Schema"));
AJAX::registerPostMethods("Band", array("Create", "Update", "Delete"));