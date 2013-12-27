define(function(){
	console.log("√ tile controller");
	return Ember.Controller.extend({
		"preloading": true,
		"_current": null,
		"current": function(name, data){
			if (data){
				console.log("Who is setting current", arguments);
				this.set("_current");
			}
			return data || this.get("_current");
		}.property(),
		"transition": null,
		"tileMap": null,
		"queue": [],
		"defaultTransition": "default",
		"defaultDirection": "left",
		"_preloadTileName": "home",
		"preloadTileName": function(name, data){
			if (data){
				this.set("_preloadTileName", data);
			}
			return window.SB.preloadTileName || data || this.get("_preloadTileName");
		}.property(), 
		"transitionLock": [],
		"loaded": function(){
			this.set("preloading", false);
		},
		"base": function(baseName){
			var tileMap = this.get("tileMap"),
				baseTile = tileMap[ baseName ],
				current = this.get("current");
			
			if (!current){
				baseTile.set("locked", true);
				this.updateCurrent( baseTile );
			}
			
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
		
		"assign": function(direction, targetName, entryName){
			var oppositeDirection = {"right":"left","left":"right","up":"down","down":"up"}[direction];
			var preloading = this.get("preloading");
			var set = function(){
				var tileMap = this.get("tileMap"),
					targetTile = tileMap[targetName],
					entryTile = tileMap[entryName],
					original = targetTile.get(direction);
				
				targetTile.set(direction, entryTile);
				entryTile.set(oppositeDirection, targetTile);
				entryTile.set(direction, original);
				original.set(oppositeDirection, entryTile);
			};
			
			if (!preloading){
				set.call(this);
				this.map();
			} else {
				var queue = this.get("queue");
				queue.pushObject(set);
			}
		},
		
		"assignRightOf": function(targetName, entryName){
			this.assign("right", targetName, entryName);
		},
		
		"assignLeftOf": function(targetName, entryName){
			this.assign("left", targetName, entryName);
		},
		
		"assignTopOf": function(targetName, entryName){
			this.assign("up", targetName, entryName);
		},
		
		"assignBottomOf": function(targetName, entryName){
			this.assign("down", targetName, entryName);
		},
		
		"currentRoutedDeamon": function(){
			SB.ApplicationController.changeHash( this.get("current").get("id") );
		}.observes("current"),
		
		"go": function(direction){
			var current = this.get("current"),
				next = current.get( direction ),
				transition = next.getTransition( direction );
			
			this.set("direction", direction);
			this.set("transition", transition);
			this.updateCurrent( next );
		},
		
		"jump": function(to, transition, direction){
			if (typeof to === "string"){
				to = this.get("tileMap")[ to ];
				if (!to){
					return SB.TileController;
				}
			}
			
			var defaultTransition = this.get("defaultTransition")
				defaultDirection = this.get("defaultDirection");
			
			this.set("direction", direction || defaultDirection);
			this.set("transition", SB.TileModel.transitions[ transition || defaultTransition ]);
			this.updateCurrent( to );
			
			return SB.TileController;
		},
		
		"load": function(){
			var queue = this.get("queue"),
				preloadName = this.get("preloadTileName");
			for (var i=0;i<queue.length; i++){
				queue[i].call(this);
			};
			
			if (preloadName){
				this.jump(preloadName);
				this.set("preloadTileName", "");
			}
			
			this.set("preloading", false);
			
			this.map();
			
			return true;
		},
		
		"updateCurrent": function(newCurrent){
			var currentTile = this.get("current");
			if (!currentTile || newCurrent && currentTile.id != newCurrent.id){
				this.set("current", newCurrent);
			}
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