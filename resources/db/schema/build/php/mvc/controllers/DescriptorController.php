<?php

abstract class DescriptorController extends BaseController{
	static protected $_target = "Descriptor";

}

AJAX::registerGetMethods("Descriptor", array("Get", "Search", "Schema"));
AJAX::registerPostMethods("Descriptor", array("Create", "Update", "Delete"));