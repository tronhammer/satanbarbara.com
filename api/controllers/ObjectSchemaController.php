<?php
/**
 * @class ObjectSchemaController
 *
 * @author <smurraysb@gmail.com>
 * @date 01/22/2014
 */

abstract class ObjectSchemaController {
	static public function Get() {

	}
}

AJAX::registerGetMethods("ObjectSchema", array("Get"));
