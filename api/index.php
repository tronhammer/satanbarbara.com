<?php

	error_reporting(-1);
	header("Access-Control-Allow-Origin: ". trim($_SERVER["HTTP_REFERER"], "/") );

	function SatanBarbaraAutoloader($className){
		/**
		 * @todo clean this up
		 */
        if (file_exists("components/" . $className . ".php")) {
            include_once("components/" . $className . ".php");
            return;
        } else if (file_exists("controllers/" . $className . ".php")) {
            include_once("controllers/" . $className . ".php");
            return;
        } else if (file_exists("exceptions/" . $className . ".php")) {
            include_once("exceptions/" . $className . ".php");
            return;
        } else if (file_exists("models/" . $className . ".php")) {
            include_once("models/" . $className . ".php");
            return;
        } else if (file_exists("objects/" . $className . ".php")) {
            include_once("objects/" . $className . ".php");
            return;
        }
	}

	spl_autoload_register("SatanBarbaraAutoloader");

	try{
		if (isset($_GET["action"])) { // Some auth may be required
			$className = $_GET["target"];
			$action = $_GET["action"];
			$controller = $className . "Controller";

			if (class_exists($controller)) {
				if (AJAX::isValidGetMethod($className, $action)){
					call_user_func($controller."::".$action);
				} else {
					AJAX::Response("json", array(), 1, "This action cannot be envoked through the get method!");
				}
			} else {
				AJAX::Response("json", array(), 1, "That target doesn't exist!");
			}
		} else if (isset($_POST["action"])) { // Auth always required
			$className = $_POST["target"];
			$action = $_POST["action"];
			$controller = $className. "Controller";
			if (class_exists($controller)) {
				if (AJAX::isValidPostMethod($className, $action)){
					call_user_func($controller."::".$action);
				} else {
					AJAX::Response("json", array(), 1, "This action cannot be envoked through the post method!");
				}
			} else {
				AJAX::Response("json", array(), 1, "That target doesn't exist!");
			}	
		} else {
			AJAX::Response("json", array(), 1, "No action was provided");
		}
	} catch(Exception $e){
		AJAX::Response("json", array(), 1, $e->getMessage());
	}