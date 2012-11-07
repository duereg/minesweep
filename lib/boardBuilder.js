/*jshint browser: true, node: true */
(function(undefined) {
	'use strict';

	var define = require("./define.js");
	var builder = require("./builder.js");
	var tileBuilder = require("./tileBuilder.js");

	var boardBuilder = function(columns, rows, mines) {
		var config = { columns: columns, rows: rows, numMines: mines };
		return builder.newGame(config, tileBuilder);
	};

	if(typeof window === 'undefined') {
		module.exports = boardBuilder;
	} else {
		define("boardBuilder", boardBuilder);
	}
})();