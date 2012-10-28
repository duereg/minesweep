var tile = function(column, row, boardClick) {
		this.isMine = false;
		this.isCovered = true;
		this.isBorder = false;
		this.value = 0;

		this.click = function() {
			if( !! !boardClick) throw("no board click method defined.");
			boardClick(column, row);
		};
	};

var board = function(columns, rows, numMines) {
		if(columns <= 0) throw "invalid column length specified";
		if(rows <= 0) throw "invalid row length specified";
		if(numMines <= 0) throw "invalid number of mines specified";
		if(columns * rows < numMines) throw "You have specified more mines than their are spots on the board.";

		this.columns = columns;
		this.rows = rows;
		this.numMines = numMines;

		var borderPadding = 2;

		this.tiles = new Array(columns + borderPadding);
		for(var column = 0; column < this.tiles.length; column++) {
			this.tiles[column] = new Array(rows + borderPadding);
		}
	};

board.prototype.failure = function() {
	//by default, this throws. But should be overridden.
	throw "failure";
}

board.prototype.click = function(column, row) {
	var clickedTile = this.tiles[column][row];

	if(clickedTile.isMine) {
		clickedTile.isCovered = false;
		this.failure();
	} else if(clickedTile.isCovered) {
		//successful move. Uncover all continuous non-mine squares
		this.uncover(column, row);
	}
};

board.prototype.uncover = function(column, row) {
	var tileToUncover = this.tiles[column][row];

	if(!tileToUncover.isBorder && !tileToUncover.isMine && tileToUncover.isCovered) {
		//raise event here?
		tileToUncover.isCovered = false;

		if(tileToUncover.value === 0) {
			//don't need to uncover diagonals as the recursive call will handle it.
			this.uncover(column - 1, row);
			this.uncover(column + 1, row);
			this.uncover(column, row - 1);
			this.uncover(column, row + 1);
		}
	}
}

board.prototype.newGame = function() {
	this.setupBoard();
	this.addMines(this.getMinePlacements());
};

//don't need to setup the borders if this is a reset of an existing game
board.prototype.setupBoard = function() {
	for(var column = 0; column < this.tiles.length; column++) {
		for(var row = 0; row < this.tiles[column].length; row++) {
			this.tiles[column][row] = new tile(column, row, this.click);

			if((column === 0) || (row === 0) || (column === (this.tiles.length - 1)) || (row === (this.tiles[column].length - 1))) {
				this.tiles[column][row].isBorder = true;
			}
		}
	}
};

board.prototype.addMines = function(minePlacements) {
	if( !! !minePlacements) throw "invalid minePlacements";

	while(minePlacements.length > 0) {
		var mineSpot = minePlacements.shift();
		var mineRow = Math.floor(mineSpot / this.columns) + 1;
		var mineColumn = Math.floor(mineSpot % this.columns) + 1;

		this.addMine(mineColumn, mineRow);
	}
};

board.prototype.addMine = function(mineColumn, mineRow) {

	var mineTile = this.tiles[mineColumn][mineRow];
	mineTile.isMine = true;
	mineTile.value = 0;

	this.incrementNeighbors(mineColumn, mineRow);
}

board.prototype.incrementNeighbors = function(mineColumn, mineRow) {
	for(var neighborColumn = mineColumn - 1; neighborColumn < mineColumn + 2; neighborColumn++) {
		for(var neighborRow = mineRow - 1; neighborRow < mineRow + 2; neighborRow++) {
			if((neighborColumn !== mineColumn) || (neighborRow !== mineRow)) {
				var neighboringTile = this.tiles[neighborColumn][neighborRow];
				if(!neighboringTile.isMine && !neighboringTile.isBorder) {
					neighboringTile.value++;
				}
			}
		}
	}
};

//this could be a strategy if truly random is desired
//this could exceed the bounds of the board if every random op comes back 1.
board.prototype.getMinePlacements = function() {
	var placements = [];
	var step = (this.columns * this.rows) / this.numMines;

	placements.push(Math.floor(Math.random() * step));

	for(var i = 0; i < this.numMines - 1; i++) {
		placements.push(Math.floor(Math.random() * step) + placements[placements.length - 1] + 1);
	}

	return placements;
};

module.exports = board;