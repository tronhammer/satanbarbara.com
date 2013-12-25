require([
	"json!tile/data/tile.config.json",
	"tile/controllers/tile.controller",
	"tile/models/tile.model", 
	"tile/models/tile.view.model", 
	"less!tile/styles/tile.style.less"
], function(config, controller, model, viewModel) {
	console.log("√ tile component");
	
	window.SB.TileController = controller.create({
		"config": config
	});
	window.SB.TileModel = model;
	window.SB.TileView = viewModel;

	require(config.tiles.map(function(tileName){
		return "tile/tiles/"+tileName+"/"+tileName+".tile";
	}), function(){
		var controller = window.SB.TileController,
			config = controller.get("config"),
			tiles = config.tiles,
			tileMap = {},
			importMap = {};
		
		for (var i=0; i<tiles.length; i++){
			var tile = arguments[i];
			// Somewhat inefficient
			tileMap[ tile.get("id") ] = tile;
			importMap[ tiles[i] ] = tile;
		}
		
		controller.set("tileMap", tileMap);
		
		window.SB.TileController.base( importMap[ config.default ].get("id") );
		window.SB.TileController.load();
		
		$(window).bind("keydown", function(e){
			var keyMap = {
				40: "up",
				38: "down",
				39: "right",
				37: "left"
			}
			
			var direction = keyMap[ e.keyCode ];
			if (direction){
				SB.TileController.go( direction );
			}
		});
		
		SB.global.swipedetect(document, function(swipedir){
			// swipedir contains either "none", "left", "right", "top", or "down"
			(direction = {"left": "left", "right":"right", "top": "up", "down": "down"}[swipedir]) && SB.TileController.go( direction );
			console.log("direction ", direction);
		});
		
	});
});