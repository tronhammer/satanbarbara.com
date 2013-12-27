define(function(){
	console.log("√ tile controller");
	return $.extend(
		Ember.Object.extend({
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
		
			"transitionMap": {
				"left": "slide",
				"right": "slide",
				"up": "slide",
				"down": "slide"
			},
		
		
			"getTransition": function(direction){
				var transition = SB.TileModel.transitions[ this.get("transitionMap")[direction] ];
				return transition;
			}
		}),
		{
			/**
			 * Static Functions
			 */
			"transitions": {
				"default": function($content, $newContent, lock){
					console.log("standard...");
					$content.children().remove().end().append( 
						$newContent.removeClass("hide tile-view ember-view").show() 
					);
					lock("start");
					SB.events.trigger("transitionFinished")
				},
				"slide": function($content, $newContent, lock){
					console.log("slide!");
					var direction = SB.TileController.get("direction"),
						$oldContent = $content.children(),
						newPos = 1500,
						oldPos = 1000;
					
					var intMap = {
						"new": {
							"start": {
								"left": {"left": -1 * newPos, "top": 0 },
								"right": {"left": 1 * newPos, "top": 0 },
								"up": {"top": 1 * newPos, "left": 0 },
								"down": {"top": -1 * newPos, "left": 0 }
							},
							"end": {
								"left": {"left": 0 },
								"right": {"left": 0 },
								"up": {"top": 0 },
								"down": {"top": 0 }
							}
						},
						"old": {
							"left": {"left": 1 * oldPos },
							"right": {"left": -1 * oldPos },
							"up": {"top": -1 * oldPos},
							"down": {"top": 1 * oldPos}
						}
					};
					
					lock("animateOld");
					lock("animateNew");
					
					$newContent.hide().appendTo( $content ).css( $.extend({"opacity": 1}, intMap["new"]["start"][direction]) )
						.removeClass("hide tile-view ember-view").show();
					
					$oldContent.animate($.extend({"opacity": 0}, intMap["old"][direction]), "slow", function(){
						$oldContent.remove();
						lock("animateOld");
						SB.events.trigger("transitionFinished")
						
					});
					$newContent.animate(intMap["new"]["end"][direction], "slow", function(){
						lock("animateNew");
						SB.events.trigger("transitionFinished")
					});
					
					lock("start");
				}
			}
		}
	);
});