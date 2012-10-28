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

	var builder = {
		newGame: function(board) {
			board.tiles = this.createTiles(board);
			this.setupBoard(board);
			this.addMines(board, this.getMinePositions(board));
		},

		createTiles: function(board) {
			var borderPadding = 2;
			var underlyingArray = new Array(board.columns + borderPadding);
			
			for(var column = 0; column < underlyingArray.length; column++) {
				underlyingArray[column] = new Array(board.rows + borderPadding);
			}

			return underlyingArray;
		},

		setupBoard: function(board) {
			//don't need to setup the borders if this is a reset of an existing game
			for(var column = 0; column < board.tiles.length; column++) {
				for(var row = 0; row < board.tiles[column].length; row++) {
					board.tiles[column][row] = new tile(column, row, board.click);

					if((column === 0) || (row === 0) || (column === (board.tiles.length - 1)) || (row === (board.tiles[column].length - 1))) {
						board.tiles[column][row].isBorder = true;
					}
				}
			}
		},

		addMines: function(board, minePlacements) {
			if( !!!minePlacements) throw "invalid minePlacements";

			while(minePlacements.length > 0) {
				var mineSpot = minePlacements.shift();
				var mineRow = Math.floor(mineSpot / board.columns) + 1;
				var mineColumn = Math.floor(mineSpot % board.columns) + 1;

				this.addMine(board, mineColumn, mineRow);
			}
		},

		addMine: function(board, mineColumn, mineRow) {
			var mineTile = board.tiles[mineColumn][mineRow];
			mineTile.isMine = true;
			mineTile.value = 0;

			this.incrementNeighbors(board, mineColumn, mineRow);
		},

		incrementNeighbors: function(board, mineColumn, mineRow) {
			for(var neighborColumn = mineColumn - 1; neighborColumn < mineColumn + 2; neighborColumn++) {
				for(var neighborRow = mineRow - 1; neighborRow < mineRow + 2; neighborRow++) {
					if((neighborColumn !== mineColumn) || (neighborRow !== mineRow)) {
						var neighboringTile = board.tiles[neighborColumn][neighborRow];
						if(!neighboringTile.isMine && !neighboringTile.isBorder) {
							neighboringTile.value++;
						}
					}
				}
			}
		},

		getMinePositions: function(board) {
			//this could be a strategy if truly random is desired
			//this could exceed the bounds of the builder if every random op comes back 1.
			var positions = [];
			var step = (board.columns * board.rows) / board.numMines;

			positions.push(Math.floor(Math.random() * step));

			for(var i = 0; i < board.numMines - 1; i++) {
				positions.push(Math.floor(Math.random() * step) + positions[positions.length - 1] + 1);
			}

			return positions;
		} 
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