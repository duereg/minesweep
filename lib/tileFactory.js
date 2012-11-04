(function() {

	var define = require("./define.js");
	var mineViewModel = require("./mineViewModel.js"); 
	var valueViewModel = require("./valueViewModel.js"); 

	function tileFactory(column, row, tile) {
		if(tile.isBorder) return { isBorder: true};
		if(tile.isMine) return new mineViewModel(column, row, tile);
		return new valueViewModel(column, row, tile);
	};
	
	if(typeof window === 'undefined') {
		module.exports = tileFactory;
	} else {
		define("tileFactory", tileFactory);
	}
})();
