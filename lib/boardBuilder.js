(function() {
	
	var define = require("./define.js");
	var board = require("./board.js");
	var builder = require("./builder.js");

	var boardBuilder = function(columns, rows, mines) {
		var newBoard = new board(columns, rows, mines); 

		builder.newGame(newBoard);

		return newBoard;
	}

	 if(typeof window === 'undefined') {
	 	module.exports = boardBuilder;
	 } else {
	 	define("boardBuilder", boardBuilder);
	 } 
})();