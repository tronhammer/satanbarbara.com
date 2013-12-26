define([
	"json!tile/tiles/events/data/events.tile.config.json",
	"hb!tile/tiles/events/views/events.tile.view.tmpl",
	"less!tile/tiles/events/styles/events.tile.style.less"
], function(config, view){
	console.log("√ Events tile object");
	var EventsView = window.SB.TileView.extend({
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
				window.SB.TileController.assignTopOf("aboutTile", this.get("id") );
				window.SB.TileController.assignRightOf("homeTile", this.get("id") );
			},
			"view": EventsView
		}, config)
	);
});