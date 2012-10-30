(function(undefined) {

	var define = require("./define.js");
	
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

	function incrementNeighbors(board, mineColumn, mineRow) {
		incrementNeighbor(board, mineColumn - 1, mineRow);
		incrementNeighbor(board, mineColumn + 1, mineRow);
		incrementNeighbor(board, mineColumn, mineRow - 1);
		incrementNeighbor(board, mineColumn, mineRow + 1);

		incrementNeighbor(board, mineColumn - 1, mineRow - 1);
		incrementNeighbor(board, mineColumn + 1, mineRow + 1);
		incrementNeighbor(board, mineColumn + 1, mineRow - 1);
		incrementNeighbor(board, mineColumn - 1, mineRow + 1);
	};

	function incrementNeighbor(board, neighborColumn, neighborRow) {
		var neighboringTile = board.tiles[neighborColumn][neighborRow];
		if(!neighboringTile.isMine && !neighboringTile.isBorder) {
			neighboringTile.value++;
		}
	}

	function getMinePositions(board) {
		var positions = [];
		var numPositions = board.columns * board.rows;

		for(var i=0; i < numPositions; i++) {
			positions.push(i + 1);
		}
		for(var j=0; j < board.numMines; j++){
			var position = Math.floor(Math.random() * (numPositions - j) - 1) + j;
			positions[j] = positions[position];
			positions[position] = j + 1;
		}

		positions.length = board.numMines;

		return positions;
	};

	function addMines(board, minePlacements) {
		if( !!!minePlacements) throw "invalid minePlacements";

		while(minePlacements.length > 0) {
			var mineSpot = minePlacements.shift();
			var mineRow = Math.floor(mineSpot / board.columns) + 1;
			var mineColumn = Math.floor(mineSpot % board.columns) + 1;

			addMine(board, mineColumn, mineRow);
			incrementNeighbors(board, mineColumn, mineRow);
		}
	};

	function addMine (board, mineColumn, mineRow) {
		var mineTile = board.tiles[mineColumn][mineRow];
		mineTile.isMine = true;
		mineTile.value = 0;
	};

	var builder = {
		newGame: function(board) {
			if(!!! board) throw "Bad Board Bro";
			board.tiles = this.createTiles(board.columns, board.rows);
			this.setupBoard(board);
			addMines(board, getMinePositions(board));
		},

		createTiles: function(columns, rows) {
			var borderPadding = 2;
			var underlyingArray = new Array(columns + borderPadding);
			
			for(var column = 0; column < underlyingArray.length; column++) {
				underlyingArray[column] = new Array(rows + borderPadding);
			}

			return underlyingArray;
		},

		//for testing
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

		//for testing
		addMine: addMine
	}

	if(typeof window === 'undefined') {
		module.exports = builder;
	} else {
		define("builder", builder);
	}   
})();