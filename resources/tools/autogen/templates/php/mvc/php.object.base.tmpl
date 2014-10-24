<?php
/**
 * Objects are used as individual representations of their models. Objects should only
 * have functions and data that is unique to an individual state, such as it's data.
 * 
 */
abstract class BaseObject {

	/**@* {Boolean} Denotes if the current object exists in the db yet. */
    protected $_persistent = false;

    /**@* {Integer} `id` of the Performance Metric object in the database. */
    protected $_id;
    
    /**@* {Array} A temporary storage of data that will be used to create a new object in the database. */
    protected $_data = array();

    public $assocs;

    public function __construct($data = array()) {
		if (is_array($data)) {
			if (is_numeric($data["id"])) {
				$this->_SetID($data["id"]);
			} else {
				unset($data["id"]);

				if (count($data)){
					$this->SetValues($data);				
				}
			}
		} else if (is_numeric($data)) {
			$this->_SetID($data);
		}
	}

	public function GetID(){
		return $this->_id;
	}

	public function IsPersistent(){
		return $this->_persistent;
	}

	protected function _SetID($id){
		$this->id = $this->_id = $id;
		$this->_SetPersistent(true);
		return true;
	}

	protected function _SetPersistent($persistent){
		$this->_persistent = $persistent;
		return true;
	}

	protected function _SetData($data){
		foreach($data as $name=>$value){
			$this->_SetDataItem($name, $value);
		}
		return true;
	}


	protected function _SetDataItem($name, $val){
		$this->_data[$name] = $val;

		return true;
	}
}