define(function(){
	console.log("√ app model");
	
	return Ember.Object.extend({
		"info": "app model",
		"init": function(config){
			
			console.log("Initializing App Object!", arguments);
			
			return this._super();
		}
	});
});