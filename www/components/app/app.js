requirejs.config({
	//By default load any module IDs from js/lib
	"baseUrl": "components",
	"paths": {
		"lib": "../lib",
		
		"bower": "../lib/bower_components",
		"require-plugin": "../lib/bower_components/requirejs-plugins/src",
		"require-plugin-lib": "../lib/bower_components/requirejs-plugins/lib",
		"jquery-mobile": "../lib/bower_components/jquery-mobile-requirejs/js/jquery.mobile-1.3.2",
		
		"text": "../lib/bower_components/requirejs-plugins/lib/text",
		"json": "../lib/bower_components/requirejs-plugins/src/json",
		"hb": "../lib/bower_components/requirejs-handlebars/hb",
		"css": "../lib/bower_components/require-css/css",
		"less": "../lib/bower_components/require-less/less",
		"lessc": "../lib/bower_components/require-less/lessc",
		"normalize": "../lib/bower_components/require-less/normalize"
	},
	
	"map": {
		"*": {
			"jquery": "bower/jquery/jquery",
			"handlebars": "bower/handlebars/handlebars",
			"ember": "bower/ember/ember"
		}
	}
});

window.less = {
	"relativeUrls": true
}

// Start the main app logic.
require([
	"jquery",
	"ember",
	"handlebars"
], function() {
	
	$.extend(Handlebars.helpers, Ember.Handlebars.helpers);
	
	require([
		"lib/app/global",
		"json!app/data/app.config.json",
		"json!app/data/app.arch.json",
		"app/controllers/app.controller",
		"app/models/app.model", 
		"hb!app/views/app.view.tmpl",
		"less!app/styles/app.style.less"
	], function(global, config, arch, controller, model, view) {
		
		window.SB = Ember.Application.create(
			$.extend({
				"global": global
			}, config)
		);
		
		window.SB.ApplicationController = controller;
		window.SB.ApplicationModel = model;
		window.SB.ApplicationView = Ember.View.extend({
			"controllerBinding": "SB.ApplicationController",
			"template": view,
			"elementId": "app",
			"didInsertElement": function(){
				this.templateChanged();
				// $("#loading").fadeOut();
				return this._super();
			},
			
			"contentSelector": function(){
				var visible = this.get("controller").get("visible");
				return visible.instance && visible.instance.elementId || "> .content-container"; //"> .ember-view";
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
					}
					currentTileView.instance = $newContent;
				}
			}.observes("controller.visible")//,
			// "changer": function(){
			// 	// this.rerender();
			// }
		});
		
		require([
			"components/tile/tile.js"
		]);
	});
});