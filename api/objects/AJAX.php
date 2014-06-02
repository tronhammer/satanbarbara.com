<?php

abstract class AJAX {

	private static $_registered_post_methods = array();

	private static $_registered_get_methods = array();
	
	static public function Response($method = "json", $data = array(), $statusCode = 0, $statusMessage = "Success!") {
		switch($method){
			case "json":
			default:
				echo json_encode(array(
					"data" => $data,
					"status" => array(
						"code" => $statusCode,
						"message" => $statusMessage
					)
				));
				break;
		}

		return 1;
	}

	static function registerGetMethod($controller, $method){
		if (!isset(self::$_registered_get_methods[$controller])){
			self::$_registered_get_methods[$controller] = array();
		}

		/**
		 * @todo Take advantage of this in the future, make it a meaningful value.
		 */
		self::$_registered_get_methods[$controller][$method] = 1;
	}

	static function registerPostMethod($controller, $method){
		if (!isset(self::$_registered_post_methods[$controller])){
			self::$_registered_post_methods[$controller] = array();
		}

		/**
		 * @todo Take advantage of this in the future, make it a meaningful value.
		 */
		self::$_registered_post_methods[$controller][$method] = 1;
	}

	static function registerGetMethods($controller, $methods){
		foreach($methods as $method){
			self::registerGetMethod($controller, $method);
		}
	}

	static function registerPostMethods($controller, $methods){
		foreach($methods as $method){
			self::registerPostMethod($controller, $method);
		}
	}

	static public function isValidGetMethod($controller, $name){
		return (isset(self::$_registered_get_methods[$controller][$name])) ? 1 : 0;
	}

	static public function isValidPostMethod($controller, $name){
		return (isset(self::$_registered_post_methods[$controller][$name])) ? 1 : 0;
	}
}