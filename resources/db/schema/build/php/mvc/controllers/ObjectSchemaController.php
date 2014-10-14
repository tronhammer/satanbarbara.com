<?php
/**
 * @class ObjectSchemaController
 *
 * @author <smurraysb@gmail.com>
 * @date 01/22/2014
 */

abstract class ObjectSchemaController {
	static public function Get() {
		$ret = array(
			"schema" => array()
		);
		$types = explode(",", $_GET["types"]);
		foreach($types as $type){
			$ret["schema"][ $type ] = call_user_func($type."Model::GetSchema");
		}

		AJAX::Response("json", $ret);

	}
}

AJAX::registerGetMethods("ObjectSchema", array("Get"));
