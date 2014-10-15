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
}