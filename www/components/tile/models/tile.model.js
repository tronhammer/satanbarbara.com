define(function(){
	console.log("√ tile controller");
	return Ember.Object.extend({
		"locked": false,
		"_left": null,
		"_right": null,
		"_up": null,
		"_down": null,
		
		"getDirection": function(dir, data){
			var left = this.get(dir);
			if (data){
				this.set(dir, data);
				return data;
			} else if (left) {
				return left;
			} else {
				return this;
			}
		},
		
		"left": function(name, data){
			return this.getDirection("_"+name, data);
		}.property(),
		
		"right": function(name, data){
			return this.getDirection("_"+name, data);
		}.property(),
		
		"up": function(name, data){
			return this.getDirection("_"+name, data);
		}.property(),
		
		"down": function(name, data){
			return this.getDirection("_"+name, data);
		}.property(),
		
		// "leftConfigure": function(){
		// 	var locked = this.get("locked"),
		// 		leftTile = this.get("left"),
		// 		rightTile = this.get("right");
		// 	if (!isBase && !rightTile){
		// 		var leftRightTile = leftTile.get("right");
		// 		leftTile.set("right", this);
		// 		
		// 		
		// 		this.set("right", leftRightTile);
		// 		
		// 	}
		// }.observes("left")
	});
});