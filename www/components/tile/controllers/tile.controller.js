define(function(){
	console.log("√ tile controller");
	return Ember.Controller.extend({
		"preloading": true,
		"current": null,
		"transition": null,
		"tileMap": null,
		"queue": [],
		"transitionLock": [],
		"loaded": function(){
			this.set("preloading", false);
		},
		"base": function(baseName){
			var tileMap = this.get("tileMap"),
				baseTile = tileMap[ baseName ];
			
			baseTile.set("locked", true);
			
			this.set("current", baseTile);
		},
		
		"lock": function(){
			return (function(self, func){ return function(state){ return func.call(self, state); }; })(this, function(state){
				var transitionLock = this.get("transitionLock");
				if (state && transitionLock.indexOf(state) !== -1){
					transitionLock.removeObject(state);
					
				} else if (state) {
					transitionLock.pushObject(state);
				}
				return this.get("transitionLock").length;
			})
		}.property(),
		
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
			var current = this.get("current"),
				next = current.get( direction ),
				transition = next.getTransition( direction );
			
			this.set("direction", direction);
			this.set("transition", transition);
			this.set("current", next );
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
			var current = this.get("current");
			if (current){
				SB.ApplicationController.set("visible", current.get("view") );
			}
		}.observes("current")
	});
});