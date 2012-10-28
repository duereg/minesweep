(function() {

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

	var builder = function(newBoard) {
		this.board = newBoard; 
	};

	builder.prototype.newGame = function() {
		this.createTiles();
		this.setupBoard();
		this.addMines(this.getMinePositions());
	}

	builder.prototype.createTiles = function() {
		var borderPadding = 2;

		this.board.tiles = new Array(this.board.columns + borderPadding);
		for(var column = 0; column < this.board.tiles.length; column++) {
			this.board.tiles[column] = new Array(this.board.rows + borderPadding);
		}
	}

	builder.prototype.setupBoard = function() {
		//don't need to setup the borders if this is a reset of an existing game
		for(var column = 0; column < this.board.tiles.length; column++) {
			for(var row = 0; row < this.board.tiles[column].length; row++) {
				this.board.tiles[column][row] = new tile(column, row, this.board.click);

				if((column === 0) || (row === 0) || (column === (this.board.tiles.length - 1)) || (row === (this.board.tiles[column].length - 1))) {
					this.board.tiles[column][row].isBorder = true;
				}
			}
		}
	}

	builder.prototype.addMines = function(minePlacements) {
		if( !!!minePlacements) throw "invalid minePlacements";

		while(minePlacements.length > 0) {
			var mineSpot = minePlacements.shift();
			var mineRow = Math.floor(mineSpot / this.board.columns) + 1;
			var mineColumn = Math.floor(mineSpot % this.board.columns) + 1;

			this.addMine(mineColumn, mineRow);
		}
	}

	builder.prototype.addMine = function(mineColumn, mineRow) {
		var mineTile = this.board.tiles[mineColumn][mineRow];
		mineTile.isMine = true;
		mineTile.value = 0;

		this.incrementNeighbors(mineColumn, mineRow);
	}

	builder.prototype.incrementNeighbors = function(mineColumn, mineRow) {
		for(var neighborColumn = mineColumn - 1; neighborColumn < mineColumn + 2; neighborColumn++) {
			for(var neighborRow = mineRow - 1; neighborRow < mineRow + 2; neighborRow++) {
				if((neighborColumn !== mineColumn) || (neighborRow !== mineRow)) {
					var neighboringTile = this.board.tiles[neighborColumn][neighborRow];
					if(!neighboringTile.isMine && !neighboringTile.isBorder) {
						neighboringTile.value++;
					}
				}
			}
		}
	}

	builder.prototype.getMinePositions = function() {
		//this could be a strategy if truly random is desired
		//this could exceed the bounds of the builder if every random op comes back 1.
		var positions = [];
		var step = (this.board.columns * this.board.rows) / this.board.numMines;

		positions.push(Math.floor(Math.random() * step));

		for(var i = 0; i < this.board.numMines - 1; i++) {
			positions.push(Math.floor(Math.random() * step) + positions[positions.length - 1] + 1);
		}

		return positions;
	} 

	if(typeof window === 'undefined') {
		if(module && module.exports) {
			module.exports = builder; 
		} else {
			throw "Do not understand environment";
		}
	} else {window.minesweep = window.minesweep || {};
		window.minesweep.builder = builder;
	}
})();