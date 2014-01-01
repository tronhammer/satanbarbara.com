define([
	"json!tile/tiles/about/data/about.tile.config.json",
	"hb!tile/tiles/about/views/about.tile.view.tmpl",
	"less!tile/tiles/about/styles/about.tile.style.less"
], function(config, view){

	//#####----@ REQUIRED FUNCTION START @----#####//
	console.log("√ About tile object");
	var AboutView = window.SB.TileView.extend({
		"elementId": config.id,
		"template": view,
		"nameBinding": "SB.name",
		"res": function(){
			this.rerender();
		}.observes("name")
	});
	
	return window.SB.TileModel.create(
		$.extend({
			"init": function(){
				window.SB.TileController.assignRightOf("homeTile", this.get("id") );
				window.SB.TileController.assignBottomOf("homeTile", this.get("id") );
			},
			"view": AboutView
		}, config)
	);
	
	//#####----@ REQUIRED FUNCTION END @----#####//
});