<?php

abstract class BaseObject {

	/**@* {Array} Object data */
    public $data = array();
	
	/**@* {Boolean} Denotes if the current object was just created or not (may not exist in database yet!). */
    public $isNew = true;

	/**@* {Integer} A public readable id retainer. Although all functions in the scope of this object will use the protected _id. */
    public $id;

    /**@* {Integer} `id` of the Performance Metric object in the database. */
    protected $_id;
    
    /**@* {Array} A temporary storage of data that will be used to create a new object in the database. */
    protected $_data = array();

    public function __construct($data = array()) {

		if (is_array($data)) {
			if (is_numeric($data["id"])) {
				$this->_setID($data["id"]);
			}
		} else if (is_numeric($data)) {
			$this->_setID($data);
		}
	}

	private function _setID($id){
		$this->id = $this->_id = $id;
	}
}