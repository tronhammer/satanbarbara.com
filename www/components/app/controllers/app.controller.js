define(function(){
	console.log("√ app controller");
	return Ember.Controller.extend({
		"nameBinding": "SB.name",
		"_visible": null,
		"_visibleDefault": Ember.View.extend({
			"classNames": ["tile-view"],
			"elementId": "loading-placeholder",
			"controllerBinding": "SB.TileController",
			"text": "loading...",
			"template": Handlebars.compile('<div id="{{elementId}}">{{text}}</div>')
		}),
		"visible": function(name, data){
			if (data && data.toString().match("View")){
				this.set("_visible", data );
			}
			
			return this.get("_visible") || this.get("_visibleDefault").extend();
		}.property()
	});
});