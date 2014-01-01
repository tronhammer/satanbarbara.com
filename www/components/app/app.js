//#####----@ INTRO FUNCTION START @----#####//
console.log("This shit shoulda happened first amirite?");
//#####----@ INTRO FUNCTION END @----#####//
 
requirejs.config(window.SB.arch.requireConfig);

window.less = {
	"relativeUrls": true
}

//#####----@ REQUIRE-EMIT START @----#####//
require([
	"jquery",
	"handlebars",
	"ember"
], function() {
//#####----@ REQUIRE-EMIT END @----#####//
	
	//#####----@ REQUIRED FUNCTION START @----#####//
	
	console.log("WELL I'LL BE DAMNED")
	
	
	$.extend(Handlebars.helpers, Ember.Handlebars.helpers);
	
	//#####----@ REQUIRE START @----#####//
	require([
		"lib/app/global",
		"json!app/data/app.config.json",
		"json!app/data/app.arch.json",
		"app/controllers/app.controller",
		"app/models/app.model", 
		"hb!app/views/app.view.tmpl",
		"less!app/styles/app.style.less"
	], function(global, config, arch, controller, model, view) {
	//#####----@ REQUIRE END @----#####//
	
		//#####----@ REQUIRED FUNCTION START @----#####//
		
		var urlHash = location.hash.substr(1).split("/"),
			preloadTileName = urlHash[0];
		
		window.SB = Ember.Application.extend(
			$.extend({
				"global": global,
				"arch": arch,
				"events": $(window),
				"preloadTileName": preloadTileName || config.defaultTile,
				"loadingComplete": false,
				"state": Ember.Object.extend({
					"lastTileRoute": null,
					"currentTileRoute": urlHash[0] ? urlHash : [ config.defaultTile ],
				}).create() /** extend and then create so that we can use observables in desired */,
				
				"loaded": function(){
					console.log("DONE LOADING")
				}.observes("loadingComplete")
			}, config)
		).create();
		
		window.SB.ApplicationController = controller;
		window.SB.ApplicationModel = model;
		window.SB.ApplicationView = Ember.View.extend({
			"controllerBinding": "SB.ApplicationController",
			"template": view,
			"elementId": "app",
			"didInsertElement": function(){
				this.templateChanged();
				/* $("#loading").fadeOut(); */
				return this._super();
			},
			
			"contentSelector": function(){
				var visible = this.get("controller").get("visible");
				return visible.instance && visible.instance.elementId || "> .content-container";
			}.property(),
			
			"transition": function(){
				var tileController = SB.TileController;
				if (tileController){
					var current = SB.TileController.get("current");
					return current.getTransition();
				}
				
				return;
			}.property(),
			
			"templateChanged": function(){
				if (this.$()){
					var tileController = SB.TileController,
						currentTileView = this.get("controller").get("visible"),
						$newContent = currentTileView.instance || $( (newInst = currentTileView.create()).template(newInst) ).attr("id", newInst.elementId),
						$content = this.$("> .content-container");
					
					$newContent.addClass("content tile hide");
					
					if (tileController && $.isFunction((transition = tileController.get("transition")))){
						/**
						 * @todo move this
						 */ 
						var lock = tileController.get("lock");
						if (!lock()){
							lock("start");
							transition.call(this, $content, $newContent, lock);
						} else {
							return console.log("Locked!");
						}
					} else {
						$content.children().remove().end().append( 
							$newContent.removeClass("hide tile-view ember-view").show() 
						);
						SB.events.trigger("transitionFinished");
					}
					currentTileView.instance = $newContent;
				}
			}.observes("controller.visible")
		});
		
		//#####----@ REQUIRE START @----#####//
		require([
			"tile/tile"
		], function(){
		//#####----@ REQUIRE END @----#####//
		
			//#####----@ REQUIRED FUNCTION START @----#####//
			
			console.log("chicken")
			
			//#####----@ REQUIRED FUNCTION END @----#####//
			
		});
		
		//#####----@ REQUIRED FUNCTION END @----#####//
		
	});	
	
	//#####----@ REQUIRED FUNCTION END @----#####//
	
});