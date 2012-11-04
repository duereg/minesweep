(function() {

	var define = require("./define.js");
	var mineViewModel = require("./mineViewModel.js"); 
	var valueViewModel = require("./valueViewModel.js"); 

	function getTile(column, row, tile) {
		if(tile.isBorder) return { isBorder: true};
		if(tile.isMine) return new mineViewModel(column, row, tile);
		return new valueViewModel(column, row, tile);
	};

	function tileFactory(column, row, tile) {
		var tile = getTile(column, row, tile);

		for(var prop in tile) {
			if(typeof tile[prop] === 'function') {
				tile[prop].bind(tile);
			}
		}

		return tile;
	};
	
	if(typeof window === 'undefined') {
		module.exports = tileFactory;
	} else {
		define("tileFactory", tileFactory);
	}
})();
