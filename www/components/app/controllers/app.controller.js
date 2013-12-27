define(function(){
	console.log("√ app controller");
	return Ember.Controller.extend({
		"nameBinding": "SB.name",
		"lastTileRoute": "",
		"clearSet": 0,
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
		}.property(),
		"init": function(){
			SB.events.unbind("hashchange");
			SB.events.bind("hashchange", function(){
				var tileController = SB.TileController,
					clearSet = SB.get("routeClearSet"),
					currentTileRoute = SB.get("state.currentTileRoute"),
					urlHash = SB.ApplicationController.getHash();
				
				SB.set("state.lastTileRoute", currentTileRoute);
				
				if (clearSet){
					return this.set("clearSet", 0);
				}
				
				// location.hash.substr(1).split("&").map(function(keyval){
				// 	var parsed = keyval.split("="); 
				// 	vars[ parsed.pop() ] = parsed.join("");
				// });
				
				if (SB.TileController){
					var tile = tileController.get("tileMap")[ vars[0] ];
					if (tile){
						tileController.jump(tile, "slide");
					}
				}
			});
			
			return this._super();
		},
		
		"changeHash": function(tile, sub){
			var urlHash = this.getHash(),
				newHash = tile + (sub ? "/"+sub : "");
			
			if (!(urlHash[0] && urlHash[0] == tile) 
				&& !(urlHash[1] && urlHash[1] == sub)){
				this.set("clearSet", 1);
				location.hash = newHash;
			}
			
			return SB.ApplicationController;
		},
		
		"getHash": function(){
			var currentHash = this.get("state.currentTileRoute")
				vars = location.hash.substr(1).split("/");
			
			if (vars != currentHash){
				this.get("state.currentTileRoute", vars);
			}
			
			return vars;
		}
	});
});