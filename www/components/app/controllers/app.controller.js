define(function(){
	console.log("√ app controller");
	return Ember.Controller.extend({
		"nameBinding": "SB.name",
		"visible": Ember.View.extend({
			"classNames": ["hide", "tile-view"],
			"template": Ember.Handlebars.compile("<div>loading...</div>")
		}),
		"init": function(){
			console.log("interesting...");
			
			return this._super();
		}
	});
});