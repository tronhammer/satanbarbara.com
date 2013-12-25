define([
	"json!tile/tiles/home/data/home.tile.config.json",
	"hb!tile/tiles/home/views/home.tile.view.tmpl",
	"less!tile/tiles/home/styles/home.tile.style.less"
], function(config, view){
	console.log("√ Home tile object");
	var HomeView = window.SB.TileView.extend({
		"elementId": config.id,
		"template": view,
		"nameBinding": "SB.name",
		"res": function(){
			this.rerender();
		}.observes("name")
	});
	
	return window.SB.TileModel.create(
		$.extend({
			"view": HomeView
		}, config)
	);
});