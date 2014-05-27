<?php
	header("Access-Control-Allow-Origin: ". trim($_SERVER["HTTP_REFERER"], "/") );

	function SatanBarbaraAutoloader($className){
		/**
		 * @todo clean this up
		 */
		error_log("checking this yeaahh");
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

	if (isset($_GET["action"])) { // Some auth may be required
		$className = $_GET["target"];
		$controller = $className. "Controller";
		if (class_exists($className) && class_exists($controller)) {
			call_user_func($controller."::".$_GET["action"]);
		}
	} else if (isset($_POST["action"])) { // Auth always required

	} else {
		AJAXResponse::JSON(array(), 1, "No action was provided");
	}
	

		
	// 	if ($_POST["action"] == "join" && filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
	// 		try {
	// 			$statement = $dbh->prepare("INSERT INTO `accounts` (`email`) VALUES (?)");
		
	// 			$statement->execute(array(mysql_real_escape_string($_POST["email"])));
	// 		} catch (PDOException $e) {
	// 			echo json_encode(array(
	// 				"data" => array(),
	// 				"status" => array(
	// 					"code" => 2,
	// 					"message" => $e->getMessage()
	// 				)
	// 			));
	// 		}
			
	// 		echo json_encode(array(
	// 			"data" => array(
	// 				"email" => mysql_real_escape_string($_POST["email"])
	// 			),
	// 			"status" => array(
	// 				"code" => 0,
	// 				"message" => "Success"
	// 			)
	// 		));
	// 	}

	// 	if ($_GET["action"] == "create" && isset($_GET["type"])){

	// 		switch($_GET["type"]){
	// 			case "event":
	// 				try {
	// 					$statement = $dbh->prepare("INSERT INTO `accounts` (`email`) VALUES (?)");
				
	// 					$statement->execute(array(mysql_real_escape_string($_POST["email"])));
	// 				} catch (PDOException $e) {
	// 					echo json_encode(array(
	// 						"data" => array(),
	// 						"status" => array(
	// 							"code" => 2,
	// 							"message" => $e->getMessage()
	// 						)
	// 					));
	// 				}
	// 				break;
	// 		}

	// 		echo json_encode(array(
	// 			"data" => array(),
	// 			"status" => array(
	// 				"code" => 0,
	// 				"message" => "Success"
	// 			)
	// 		));
	// 	}

	// } else if (isset($_GET["action"])) {
		
	// 	try {
	// 		$dbh = new PDO("mysql:host=localhost;dbname=satanbarbara", "sbclient", "sbmetal666");
	// 	} catch (PDOException $e) {
	// 	    error_log('Connection failed: ' . $e->getMessage());
	// 		echo json_encode(array(
	// 			"data" => array(),
	// 			"status" => array(
	// 				"code" => 2,
	// 				"message" => "Connection failed"
	// 			)
	// 		));
	// 	}
		
	// 	if ($_GET["action"] == "getEmails"){
	// 		try {
	// 			$statement = $dbh->prepare("SELECT * FROM `accounts`");
		
	// 			$statement->execute();
	// 		} catch (PDOException $e) {
	// 			echo json_encode(array(
	// 				"data" => array(),
	// 				"status" => array(
	// 					"code" => 2,
	// 					"message" => $e->getMessage()
	// 				)
	// 			));
	// 		}
			
	// 		echo json_encode(array(
	// 			"data" => $statement->fetchAll(PDO::FETCH_ASSOC),
	// 			"status" => array(
	// 				"code" => 0,
	// 				"message" => "Success"
	// 			)
	// 		));
	// 	}

	// } else {
	// 	echo json_encode(array(
	// 		"status" => array(
	// 			"code" => 1,
	// 			"message" => "No action was provided"
	// 		)
	// 	));
	// }
	

