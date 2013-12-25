define([
	"json!tile/tiles/about/data/about.tile.config.json",
	"hb!tile/tiles/about/views/about.tile.view.tmpl",
	"less!tile/tiles/about/styles/about.tile.style.less"
], function(config, view){
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
				console.log("initializing home controller");
				window.SB.TileController.assignRightOf("homeTile", this.get("id") );
			},
			"view": AboutView
		}, config)
	);
});