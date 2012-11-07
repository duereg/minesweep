/*jshint browser: true, node: true */
(function() {
	'use strict';

	var define = require("./define.js");

	var events = {
		tile: {
			uncover: "tile.uncover",
			tag: "tile.tagged",

			exploded: "tile.exploded",
			showMines: "tile.showMines",
			hideMines: "tile.hideMines",
			disarm: "tile.disarmMines",
			resize: "tile.resize"
		},
		board: {
			uncover: "Board.uncover"
		}
	};

	if(typeof window === 'undefined') {
		module.exports = events;
	} else {
		define("events", events);
	}
})();