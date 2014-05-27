<?php

class Account extends AccountModel {
	
	/**@* {Boolean} Denotes if the current object was just created or not (may not exist in database yet!). */
    public $isNew = true;

    /**@* {Integer} `id` of the Performance Metric object in the database. */
    private $_id;
    
    /**@* {Array} A temporary storage of data that will be used to create a new object in the database. */
    private $_data = array();
    
	public function __construct() {
		
	}
}