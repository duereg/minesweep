(function() {

	function getDeps(name) {
		var dependency = null;
		if((typeof window === 'undefined') && (typeof require !== 'undefined')) {
			dependency = require("./" + name + ".js");
		} else {
			dependency = window.minesweep[name];
		}
		return dependency;
	}

	var board = getDeps("board");
	var builder = getDeps("builder");

	var boardBuilder = function(columns, rows, mines) {
			var newBoard = new board(columns, rows, mines); 

			builder.newGame(newBoard);

			return newBoard;
		}

	if(typeof window === 'undefined') {
		if(module && module.exports) {
			module.exports = boardBuilder;
		} else {
			throw "Do not understand environment";
		}
	} else {
		window.minesweep = window.minesweep || {};
		window.minesweep.boardBuilder = boardBuilder;
	}

})();