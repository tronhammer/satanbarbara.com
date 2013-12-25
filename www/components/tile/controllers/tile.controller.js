define(function(){
	console.log("√ tile controller");
	return Ember.Controller.extend({
		"preloading": true,
		"current": null,
		"tileMap": null,
		"queue": [],
		"loaded": function(){
			this.set("preloading", false);
		},
		"base": function(baseName){
			var tileMap = this.get("tileMap"),
				baseTile = tileMap[ baseName ];
			
			baseTile.set("locked", true);
			
			this.set("current", baseTile);
		},
		
		"assignRightOf": function(targetName, entryName){
			var preloading = this.get("preloading");
			var set = function(){
				var tileMap = this.get("tileMap"),
					targetTile = tileMap[targetName],
					entryTile = tileMap[entryName],
					original = targetTile.get("left");
				
				targetTile.set("left", entryTile);
				entryTile.set("right", targetTile);
				entryTile.set("left", original);
				original.set("right", entryTile);
			};
			
			if (!preloading){
				set.call(this);
				this.map();
			} else {
				var queue = this.get("queue");
				queue.pushObject(set);
			}
		},
		
		"assignLeftOf": function(targetName, entryName){
			var preloading = this.get("preloading");
			var set = function(){
				var tileMap = this.get("tileMap"),
					targetTile = tileMap[targetName],
					entryTile = tileMap[entryName],
					original = targetTile.get("right");
				
				targetTile.set("right", entryTile);
				entryTile.set("left", targetTile);
				entryTile.set("right", original);
				original.set("left", entryTile);
			};
			
			if (!preloading){
				set.call(this);
				this.map();
			} else {
				var queue = this.get("queue");
				queue.pushObject(set);
			}
		},
		
		"go": function(direction){
			var current = this.get("current");
			this.set("current", current.get( direction ) );
		},
		
		"load": function(){
			var queue = this.get("queue");
			for (var i=0;i<queue.length; i++){
				queue[i].call(this);
			};
			
			this.map();
			
			return true;
		},
		/**
		 * Maps tiles
		 */
		"map": function(){
			console.log("MAPPING!");
			var current = this.get("current");
			if (current){
				SB.ApplicationController.set("visible", current.get("view") );
			}
		}.observes("current")
	});
});