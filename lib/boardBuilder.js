/*jshint browser: true, node: true */
(function(undefined) {
	'use strict';

	var define = require("./define.js");
	var Board = require("./Board.js");
	var builder = require("./builder.js");

	var boardBuilder = function(columns, rows, mines) {
		var newBoard = new Board(columns, rows, mines);

		builder.newGame(newBoard);

		return newBoard;
	};

	if(typeof window === 'undefined') {
		module.exports = boardBuilder;
	} else {
		define("boardBuilder", boardBuilder);
	}
})();