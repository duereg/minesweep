(function(undefined) {

	var board = function(columns, rows, numMines) {
		if(columns <= 0) throw "invalid column length specified";
		if(rows <= 0) throw "invalid row length specified";
		if(numMines <= 0) throw "invalid number of mines specified";
		if(columns * rows < numMines) throw "You have specified more mines than their are spots on the board.";

		var me = this;

		this.tiles = [];
		this.columns = columns;
		this.rows = rows;
		this.numMines = numMines;
	};

	if(typeof window === 'undefined') {
		if(module && module.exports) {
			module.exports = board;
		} else {
			throw "Do not understand environment";
		}
	} else {
		window.minesweep = window.minesweep || {};
		window.minesweep.board = board;
	}
})(undefined);