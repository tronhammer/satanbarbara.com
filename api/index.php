<?php
	header("Access-Control-Allow-Origin: ". trim($_SERVER["HTTP_REFERER"], "/") );

	if (isset($_POST["action"])){
		
		try {
			$dbh = new PDO("mysql:host=localhost;dbname=satanbarbara", "satanbarbara", "iwilldie");
		} catch (PDOException $e) {
		    error_log('Connection failed: ' . $e->getMessage());
			echo json_encode(array(
				"data" => array(),
				"status" => array(
					"code" => 2,
					"message" => "Connection failed"
				)
			));
		}
		
		if ($_POST["action"] == "join" && filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
			try {
				$statement = $dbh->prepare("INSERT INTO `accounts` (`email`) VALUES (?)");
		
				$statement->execute(array(mysql_real_escape_string($_POST["email"])));
			} catch (PDOException $e) {
				echo json_encode(array(
					"data" => array(),
					"status" => array(
						"code" => 2,
						"message" => $e->getMessage()
					)
				));
			}
			
			echo json_encode(array(
				"data" => array(),
				"status" => array(
					"code" => 0,
					"message" => "Success"
				)
			));
		}
	} else if (isset($_GET["action"])) {
		if ($_GET["action"] == "getEmails"){
			try {
				$statement = $dbh->prepare("SELECT * FROM `accounts`");
		
				$statement->execute(array(mysql_real_escape_string($_POST["email"])));
			} catch (PDOException $e) {
				echo json_encode(array(
					"data" => array(),
					"status" => array(
						"code" => 2,
						"message" => $e->getMessage()
					)
				));
			}
			
			echo json_encode(array(
				"data" => $statement->fetchAll(PDO::FETCH_ASSOC),
				"status" => array(
					"code" => 0,
					"message" => "Success"
				)
			));
		}
	} else {
		echo json_encode(array(
			"status" => array(
				"code" => 1,
				"message" => "No action was provided"
			)
		));
	}
	

