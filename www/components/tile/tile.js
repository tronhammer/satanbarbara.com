require([
	"json!tile/data/tile.config.json",
	"tile/controllers/tile.controller",
	"tile/models/tile.model", 
	"tile/models/tile.view.model", 
	"less!tile/styles/tile.style.less"
], function(config, controller, model, viewModel) {

	//#####----@ REQUIRED FUNCTION START @----#####//
	console.log("√ tile component");
	
	window.SB.TileModel = model;
	window.SB.TileController = controller.create({
		"config": config
	});
	window.SB.TileView = viewModel;

	/* require(config.tiles.map(function(tileName){
		return "tile/tiles/"+tileName+"/"+tileName+".tile";
	} */

	//#####----@ REQUIRE START @----#####//
	require([
		"tile/tiles/home/home.tile",
		"tile/tiles/about/about.tile",
		"tile/tiles/events/events.tile"
	], function(){
	//#####----@ REQUIRE END @----#####//
	
		//#####----@ REQUIRED FUNCTION START @----#####//
		var controller = window.SB.TileController,
			config = controller.get("config"),
			tiles = config.tiles,
			tileMap = {},
			importMap = {};
		
		for (var i=0; i<tiles.length; i++){
			var tile = arguments[i];
			/**
			 * @todo Somewhat inefficient
			 */
			tileMap[ tile.get("id") ] = tile;
			importMap[ tiles[i] ] = tile;
		}
		
		window.SB.TileController.set("tileMap", tileMap);
		
		window.SB.TileController.base( SB.get("preloadTileName") || importMap[ config.default ].get("id") );
		window.SB.TileController.load();
		
		$(window).bind("keydown", function(e){
			var lock = SB.TileController.get("lock");
			if (lock()){
				return console.log("locked!");
			}
			
			var keyMap = {
				40: "up",
				38: "down",
				39: "right",
				37: "left"
			}
			
			var direction = keyMap[ e.keyCode ];
			if (direction){
				/* $("#loading").show(); */
				var $compass = $(".map-arrow");
				$compass.addClass("arrow-"+direction).fadeIn(200, function(){ 
					$compass.fadeOut(200, function(){ 
						$compass.removeClass("arrow-"+direction); 
					});
				});
				SB.TileController.go( direction );
			}
		});
		
		SB.global.swipedetect(document, function(swipedir){
			var lock = SB.TileController.get("lock");
			if (lock()){
				return console.log("locked!");
			}
			
			(direction = {"left": "left", "right": "right", "top": "up", "down": "down"}[swipedir]) 
			/* && $("#loading").show() */
			&& SB.TileController.go( direction );
		});
		
		//#####----@ REQUIRED FUNCTION END @----#####//
	});
	
	//#####----@ REQUIRED FUNCTION END @----#####//
});