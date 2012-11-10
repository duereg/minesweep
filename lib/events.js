/*jshint browser: true, node: true */
(function() {
	'use strict';

	var define = require("./define.js");

	var events = {
		tile: {
			uncover: "tile.uncover",
			tag: "tile.tagged",
			resize: "tile.resize",
			destroy: "tile.destroy",

			exploded: "tile.exploded",
			showMines: "tile.showMines",
			hideMines: "tile.hideMines",
			disarm: "tile.disarmMines"
		},
		board: {
			uncover: "board.uncover"
		},
		game: {
			isValid: "game.isValid",
			canValidate: "game.canValidate"
		}
	};

	module.exports = events;
})();