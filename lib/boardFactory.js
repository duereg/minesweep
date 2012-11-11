/*jshint browser: true, node: true */
(function(undefined) {
	'use strict';

	var boardBuilder = require("./boardBuilder.js");
	var tileFactory = require("./tileFactory.js");

	var boardFactory = function(columns, rows, mines) {
		if(typeof columns !== 'number') throw 'Invalid Number of Columns Given: ' + columns;
		if(typeof rows !== 'number') throw 'Invalid Number of Rows Given: ' + rows;
		if(typeof mines !== 'number') throw 'Invalid Number of Mines Given: ' + mines;

		var config = { columns: columns, rows: rows, numMines: mines };
		return boardBuilder.newGame(config, tileFactory);
	};

	module.exports = boardFactory;
})();