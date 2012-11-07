/*jshint browser: true, node: true */
(function(undefined) {
	'use strict';
	
	var define = require("./define.js");
	var MineViewModel = require("./mineViewModel.js");
	var ValueViewModel = require("./valueViewModel.js");

	var tileBuilder = {
		createMine: function(column, row) { 
			return new MineViewModel(column, row);
		},
		createBorder: function(column, row) { 
			return { isBorder: true};
		},
		createTile: function(column, row) { 
			return new ValueViewModel(column, row);
		},
		isMine: function(tile) { return tile instanceof MineViewModel; },
		isBorder: function (tile) { return tile && tile.isBorder; },
		incrementValue: function (tile) { tile.value(tile.value() + 1); }
	};

	if(typeof window === 'undefined') {
		module.exports = tileBuilder;
	} else {
		define("tileBuilder", tileBuilder);
	}
})();