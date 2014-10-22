<?php

abstract class DescriptorController extends BaseController {
	static protected $_target = "Descriptor";
	static protected $_key = "descriptors";

}

AJAX::registerGetMethods("Descriptor", array("Get", "Search", "Schema"));
AJAX::registerPostMethods("Descriptor", array("Create", "Update", "Delete"));