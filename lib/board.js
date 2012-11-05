(function(undefined) {
	'use strict';
	
	var define = require("./define.js");

	var board = function(columns, rows, numMines) {
		if(columns <= 0) throw "invalid column length specified";
		if(rows <= 0) throw "invalid row length specified";
		if(numMines <= 0) throw "invalid number of mines specified";
		if(columns * rows < numMines) throw "You have specified more mines than their are spots on the board.";

		this.tiles = [];
		this.columns = columns;
		this.rows = rows;
		this.numMines = numMines;
	};
 
	 if(typeof window === 'undefined') {
	 	module.exports = board;
	 } else {
	 	define("board", board);
	 }
})();