<?php

abstract class ObjectAssociation {

	static public function MakeAssoc($name, BaseObject $from, BaseObject $to){
		if ($from->IsPersistent() && $to->IsPersistent()){
			$db = MySQLConnector::getHandle();

			$query = "INSERT INTO `". $name ."` (`from`,`to`) VALUES (?,?)";
			$data = array($from->GetID(), $to->GetID());

			$statement = $db->prepare($query);
			if (!$statement->execute($data)) {
				if ($statement->errorCode() == 23000) {
					throw new Exception("Object name already exists in the database!" . var_export($statement->errorInfo(), true));
				} else {
					throw new Exception("Couldn't save object to database! ". var_export($statement->errorInfo(), true));
				}
			}
			
			if (!$id = $db->lastInsertId()) {
				throw new Exception("Couldn't get new object id from database! ". var_export($statement->errorInfo(), true));
			}

			return $id;

		} else {
			throw new Exception("Both objects must be persistent before making an association!");
		}
	}


	/**
	 * Class Methods
	 */
	static public function GetAssocs($Object, $referenceNames="*") {
		$db = MySQLConnector::getHandle();
		$references = array();
		$retreived = array();

		if ($referenceNames == "*"){
			$references = $Object::$references;
		} else if (is_array($referenceNames)){
			foreach($referenceNames as $referenceName){
				$references[$referenceName] = $Object::$references[$referenceName];
			}
		} else if (is_string($referenceNames)){
			$references[$referenceNames] = $Object::$references[$referenceName];
		}

		try {
			foreach($references as $referenceName=>$referenceObjectName){
				$retreived[$referenceName] = array(
					"target" => $referenceObjectName,
					"key" => $referenceObjectName::_TABLE,
					"ids" => array()
				);

				$statement = $db->prepare("SELECT `".$referenceName."`.`to` FROM `".$referenceName."` WHERE `".$referenceName."`.`from` = ?");
				
				$statement->execute(array($Object->GetID()));

				$resultSets = $statement->fetchAll(PDO::FETCH_ASSOC);

				foreach($resultSets as $result){
					$retreived[$referenceName]["ids"][] = $result["to"];
				}
			}
		} catch (PDOException $e) {
			return AJAX::Response("json", array(), 2, $e->getMessage());
		}
		return $retreived;
	}
}