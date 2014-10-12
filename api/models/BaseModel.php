<?php

abstract class BaseModel extends BaseObject {

	/**
	 * @brief Sets the value of a single specific property.
	 *
	 * ## Overview 
	 * This will update the database for a specific proptery. If this object hasn't been
	 * saved yet (ie, doesn't have an `id`), the values will be stored in the $_data 
	 * array and gathered during the save process.
	 *
	 * @throws Exception
	 * @throws DBUniqueNameException
	 *
	 * @param {String}	$name Key to an existing property that must be in the $attrs list.
	 * @param {Mixed}	 $value A value which must pass validation and sanitization from Sanitize.
	 *
	 * @return {Boolean} True on success, otherwise an Exception is thrown.
	 *
	 * @author <smurray@ontraport.com>
	 * @date 01/22/2014
	 */
	public function SetValue($name, $value) {
		if (is_int($this->_id)) {
			$db = MySQLConnector::getHandle();

			if (isset(static::$attrs[$name])) {
				$cleanAttrs = self::Sanitize($name, $value);
				
				if (is_array($cleanAttrs) && !empty($cleanAttrs))  {
					$statement = $db->prepare("UPDATE `". static::_TABLE ."` SET `". $name ."`=? WHERE `id`=?");
					
					if (!$statement->execute(array($cleanAttrs[$name], $this->_id))) {
						if ($statement->errorCode() == 23000) {
							throw new Exception("Object name already exists in the database! "  . var_export($statement->errorInfo(), true));
						} else  {
							throw new Exception("Couldn't update Object property $name! ". var_export($statement->errorInfo(), true));
						}
					}
				} else {
					throw new Exception("$name contains invalid data!");
				}
			} else {
				throw new Exception("$name isn't a property of this object!");
			}
		}
		
		return true;
	}
	
	/**
	 * @brief Sets values to multiple properties of a single object.
	 *
	 * ## Overview
	 *
	 * @throws Exception
	 * @throws DBUniqueNameException
	 *
	 * @param {Array} $data A key/value pair of properties to be updated that must pass sanitization.
	 *
	 * @return {Boolean} True on success, otherwise an Exception is thrown.
	 *
	 * @author <smurray@ontraport.com>
	 * @date 01/22/2014
	 */
	public function SetValues($data) {

		if (is_array($data)) {
			if (is_int($this->_id)) {
				$db = MySQLConnector::getHandle();

				$cleanAttrs = self::Sanitize($data);
				if (is_array($cleanAttrs) && !empty($cleanAttrs)) {
					$query = "UPDATE `". static::_TABLE ."` SET";
					$names = array_keys($cleanAttrs);
					$values = array_values($cleanAttrs);
				
					if (!empty($names)) {
						// Add name placeholders
						$query .= " `". implode($names, "`=?, `") . "`=?";
					}
				
					$query .= " WHERE `id`=?";
					$values[] = $this->_id;
				
					$statement = $db->prepare($query);

					if (!$statement->execute($values)) {
						if ($statement->errorCode() == 23000) {
							throw new Exception("Performance Metric name already exists in the database!");
						} else {
							throw new Exception("Couldn't save Performance Metric to database! ". var_export($statement->errorInfo(), true));
						}
					}
				} else {
					/**
					 * @todo Provide more details of which properties failed.
					 */
					throw new Exception("Request contains invalid data!");
				}
			}
		} else {
			/**
			 * @todo Should we warn that the param provided was unusable?
			 */
			return false;
		}
		
		return $data;
	}
	
	/**
	 * @brief Provides the value to a desired property.
	 *
	 * ## Overview
	 *
	 * @uses PDO
	 *
	 * @throws Exception
	 *
	 * @param {Array} $name A property name that must exist in the $attrs list.
	 *
	 * @return {Mixed} Value of property on success, otherwise an Exception is thrown or false is returned.
	 *
	 * @author <smurray@ontraport.com>
	 * @date 01/22/2014
	 */
	public function GetValue($name) {

		if (isset(static::$attrs[$name])) {
			if (is_int($this->_id)) {
				$db = MySQLConnector::getHandle();

				$statement = $db->prepare("SELECT `". $name ."` FROM `". static::_TABLE ."` WHERE `id`=?");
				if (!$statement->execute(array($this->_id))) {
					throw new Exception("Couldn't get object property $name! ". var_export($statement->errorInfo(), true));
				}
				
				$data = $statement->fetch(PDO::FETCH_ASSOC);
			}
		} else {
			/**
			 * @todo Could warn that property doesn't exist/isn't allowed for this object.
			 */
			return false;
		}
		
		return $data[$name];
	}
	
	/**
	 * @brief Provides the values to a set of properties.
	 *
	 * ## Overview
	 * This will retrieve as set of properties and their values from the backend. If a param is
	 * not provided, or is an empty array or string containing a wildcard, all property values will
	 * be returned.
	 *
	 * @uses PDO
	 *
	 * @throws Exception
	 *
	 * @param {Mixed} $names An array of property names that must exist in the $attrs list.
	 *
	 * @return {Mixed} Value of property on success, otherwise an Exception is thrown or false is returned.
	 *
	 * @author <smurray@ontraport.com>
	 * @date 01/22/2014
	 */
	public function GetValues($names="*") {
		$db = MySQLConnector::getHandle();

		if ($names == "*" || is_array($names) && empty($names)) {
			$names = array_keys(static::$attrs);
		}
		
		if (is_array($names) && !empty($names)) {
			$cleanAttrs = array();
			foreach($names as $pos=>$name) {
				if (isset(static::$attrs[$name])) {
					$cleanAttrs[] = $name;
				} else {
					/**
					 * @todo Could warn that property doesn't exist/isn't allowed for this object.
					 */
					continue;
				}
			}
			
			if (!empty($cleanAttrs)) {
				$statement = $db->prepare("SELECT `". implode($cleanAttrs, "`, `") ."` FROM `". static::_TABLE ."` WHERE `id`=?");
				if (!$statement->execute(array($this->_id))) {
					throw new Exception("Couldn't get object property $name! ". var_export($statement->errorInfo(), true));
				}
				$ret = $statement->fetch(PDO::FETCH_ASSOC);
			}
		} else {
			/**
			 * @todo Should we warn that the param provided was unusable?
			 */
			return false;
		}
		
		return $ret;
	}
	
	/**
	 * @brief Creates a new object record in the database.
	 *
	 * ## Overview
	 *
	 * @throws Exception
	 * @throws DBUniqueNameException
	 *
	 * @param {Array} $data A key/value pair of properties to be set that must pass sanitization.
	 *
	 * @return {Boolean} True on success, otherwise an Exception is thrown or false is returned.
	 *
	 * @author <smurray@ontraport.com>
	 * @date 01/22/2014
	 */
	public function Save($data) {
		$db = MySQLConnector::getHandle();

		$cleanAttrs = self::Sanitize($data);

		if (is_array($cleanAttrs) && !empty($cleanAttrs)) {
			$query = "INSERT INTO `". static::_TABLE ."`";
			$names = array_keys($cleanAttrs);
			$values = array_values($cleanAttrs);
			
			if (!empty($names)) {
				// Add property name map
				$query .= " (`". implode($names, "`, `") . "`) ";
				// Add property value placeholders
				$query .= "VALUES (". implode(array_fill(0, count($names), "?"), ", ") . ")";
			}

			error_log($query);
			error_log(var_export($values, true));

			$statement = $db->prepare($query);
			// error_log($query);
			// error_log(var_export($values, true));
			if (!$statement->execute($values)) {
				if ($statement->errorCode() == 23000) {
					throw new Exception("Object name already exists in the database!" . var_export($statement->errorInfo(), true));
				} else {
					throw new Exception("Couldn't save object to database! ". var_export($statement->errorInfo(), true));
				}
			}
			
			if (!$id = $db->lastInsertId()) {
				throw new Exception("Couldn't get new object id from database! ". var_export($statement->errorInfo(), true));
			}
		} else {
			/**
			 * @todo Didn't pass sanitization, should we warn?
			 */
			throw new Exception("Didn't pass sanitization!");
		}

		return new Event($id);
	}
	
	/**
	 * @brief Deletes a record from the database by `id`.
	 *
	 * @return {Boolean} True on success, otherwise an Exception is thrown or false is returned.
	 *
	 * @author <smurray@ontraport.com>
	 * @date 01/22/2014
	 */
	public function Delete() {
		if (is_int($this->_id)) {
			$db = MySQLConnector::getHandle();

			$statement = $db->prepare("DELETE FROM `". static::_TABLE ."` WHERE `id`=?");
			if (!$statement->execute(array($this->_id))) {
				throw new Exception("Couldn't delete object from database! ". var_export($statement->errorInfo(), true));
			}
		} else {
			/**
			 * @todo No id when trying to delete, should we warn them?
			 */
			return false;
		}
	
		return true;
	}
	
	/**
	 * @brief Sanitizes data that will potentially be sent to the database.
	 *
	 * @param {Mixed}	$name array of key/value pairs of properties, or a single property name.
	 * @param {String}	$value A value to a property when $name is a string.
	 *
	 * @return {Boolean} True if all properties were valid and sanitized, otherwise an Exception is thrown or false is returned.
	 *
	 * @author <smurray@ontraport.com>
	 * @date 01/22/2014
	 */
	public static function Sanitize($name, $value=false)
	{
		$ret = array();

		if (is_array($name))
		{
			$data = $name;
			foreach($data as $attrName=>$value)
			{
				if (isset(static::$attrs[$attrName]))
				{
					$attrTypeCheck = static::$attrs[$attrName];
					if (!is_callable($attrTypeCheck) || $attrTypeCheck($value))
					{
						$valData[$attrName] = $value;
						$ret[$attrName] = static::Validate(array(
							"name" => $attrName,
							"value"=>$value
						));
					}
					else
					{
						/**
						 * @todo Create a way to return list of failed type checks
						 */
						throw new Exception("$attrName failed check on value: " . var_export($value, true));
					}
				}
			}
		}
		else if (is_string($name) && isset(static::$attrs[$name]) )
		{

			$attrTypeCheck = static::$attrs[$name];
			if (!is_callable($attrTypeCheck) || $attrTypeCheck($value))
			{
				$ret[$name] = $value;
			}
			else
			{
				/**
				 * @todo Create a way to return list of failed type checks
				 */
				throw new Exception("$name failed check on value: " . var_export($value, true));
			}
		}
		else
		{
			/**
			 * @todo No data, should we be worried?
			 */
			return false;
		}

		// If any required fields are missing, fail out.
		$missingRequiredFields = array_diff( static::$required, array_keys($ret));
		if (count($missingRequiredFields))
		{
			/**
			 * @todo Warn or throw exception that there are missing properties.
			 */
			throw new Exception("Missing required fields: " . var_export($missingRequiredFields, true));
		}

		return $ret;
	}

	abstract static public function Validate($data);
}