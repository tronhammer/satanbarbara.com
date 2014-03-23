<?php
	
	if ($_POST["action"] == "join" && filter_var($_POST["email"], FILTER_VALIDATE_EMAIL))
	{
		try {
			
			error_log("try this plz: " . $_POST["email"]);
			$dbh = new PDO("mysql:host=localhost;dbname=satanbarbara", "satanbarbara", "iwilldie");
			
			$statement = $dbh->prepare("INSERT INTO `accounts` (`email`) VALUES (?)");
		
			$statement->execute(array(mysql_real_escape_string($_POST["email"])));
		} catch (PDOException $e) {
		    error_log('Connection failed: ' . $e->getMessage());
		}
	}