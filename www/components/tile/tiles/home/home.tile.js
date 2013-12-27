define([
	"json!tile/tiles/home/data/home.tile.config.json",
	"hb!tile/tiles/home/views/home.tile.view.tmpl",
	"less!tile/tiles/home/styles/home.tile.style.less"
], function(config, view){
	console.log("√ Home tile object");
	var staticProperties = {
		"parchmentExpand": function(){
			var tileController = SB.TileController;
			if (tileController){
				var currentTile = SB.TileController.get("current"),
					lock = tileController.get("lock");
				/**
				 * @todo make this bringing config back into scope isn't murder
				 */
				if (!lock() && currentTile.id == config.id){
					$(".parchment-container").css({"top": -100, "left": -300}).fadeIn();
					$(".parchment-container").animate({"top":100,"left":0}, 1200);
					$(".parchment-container .tile-body").animate({"height": 350}, 1800);
					SB.events.unbind("transitionFinished", tileController.get("tileMap")[ config.id ].parchmentExpand);
				}
			}
		}
	};
	
	var HomeView = window.SB.TileView.extend({
		"elementId": config.id,
		"template": view,
		"nameBinding": "SB.name",
		"res": function(){
			this.rerender();
		}.observes("name")
	});
	
	SB.events.bind("transitionFinished", staticProperties.parchmentExpand);
	
	return $.extend(
		window.SB.TileModel.create(
			$.extend({
				"view": HomeView
			}, config)
		), 
		staticProperties 
	);
});