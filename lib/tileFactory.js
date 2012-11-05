/*jshint browser: true, node: true */
(function() {
	'use strict';

	var define = require("./define.js");
	var MineViewModel = require("./MineViewModel.js"); 
	var ValueViewModel = require("./ValueViewModel.js"); 

	function tileFactory(column, row, tile) {
		if(tile.isBorder) return { isBorder: true};
		if(tile.isMine) return new MineViewModel(column, row, tile);
		return new ValueViewModel(column, row, tile);
	}
	
	if(typeof window === 'undefined') {
		module.exports = tileFactory;
	} else {
		define("tileFactory", tileFactory);
	}
})();
