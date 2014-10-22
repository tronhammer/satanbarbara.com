<?php

abstract class AccountController extends BaseController {
	static protected $_target = "Account";
	static protected $_key = "accounts";

}

AJAX::registerGetMethods("Account", array("Get", "Search", "Schema"));
AJAX::registerPostMethods("Account", array("Create", "Update", "Delete"));