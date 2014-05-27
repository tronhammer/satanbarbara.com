<?php

abstract class AJAXResponse {
	
	static public function JSON($data = array(), $statusCode = 0, $statusMessage = "Success!") {
		echo json_encode(array(
			"data" => $data,
			"status" => array(
				"code" => $statusCode,
				"message" => $statusMessage
			)
		));
	}
}