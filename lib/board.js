var tile = function(x, y, boardClick) {
	this.isMine = false;
	this.isCovered = true;
	this.isBorder = false;
	this.value = 0;

	this.click = function() {
		if(!!!boardClick) throw ("no board click method defined."); 
		boardClick(x, y);
	};
};

var board = function(columns, rows, numMines) {
	this.columns = columns;
	this.rows = rows; 
	this.numMines = numMines;
	this.borderPadding = 2;

	this.tiles = new Array(columns + this.borderPadding);
	for(var column = 0; column < this.tiles.length; column++) {
		this.tiles[column] = new Array(rows + this.borderPadding);
	}
};

board.prototype.click = function(x, y) {

};

board.prototype.newGame = function() {
	this.setupBoard();
	this.addMines();
};

board.prototype.setupBoard = function() {
	//Wasteful. Could just push and shift border rows onto the tiles, instead of iterating through everything. 
	for(var column = 0; column < this.tiles.length; column++) {
		for(var row = 0; row < this.tiles[column].length; row++) { 
			this.tiles[column][row] = new tile(column, row, this.click);

			if((column === 0) || (row === 0) || (column === (this.tiles.length - 1)) || (row === (this.tiles[column].length - 1))) {
				this.tiles[column][row].isBorder = true;
			} 
		}
	}
};

board.prototype.addMines = function() {
	var minePlacements = this.getMinePlacements();

	while(minePlacements.length > 0) {
		var mineSpot = minePlacements.shift();
		var mineRow = Math.floor(mineSpot / this.columns) + 1;
		var mineColumn = Math.floor(mineSpot % this.columns) + 1;

		this.tiles[mineColumn][mineRow].isMine = true;
	}
};

board.prototype.getMinePlacements = function() {
	var placements = [];
	var step = (this.columns * this.rows) / this.numMines; 

	placements.push(Math.floor(Math.random() * step));
	for(var i =0; i < this.numMines; i++) {
		placements.push(Math.floor(Math.random() * step) + placements[placements.length - 1]);
	}

	return placements;
};

module.exports = board;