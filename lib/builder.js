/*jshint browser: true, node: true */
(function(undefined) {
	'use strict';

	var define = require("./define.js");

	function incrementNeighbors(board, tileBuilder, minePosition) {
		incrementNeighbor(board, tileBuilder, minePosition.column - 1, minePosition.row);
		incrementNeighbor(board, tileBuilder, minePosition.column + 1, minePosition.row);
		incrementNeighbor(board, tileBuilder, minePosition.column, minePosition.row - 1);
		incrementNeighbor(board, tileBuilder, minePosition.column, minePosition.row + 1);

		incrementNeighbor(board, tileBuilder, minePosition.column - 1, minePosition.row - 1);
		incrementNeighbor(board, tileBuilder, minePosition.column + 1, minePosition.row + 1);
		incrementNeighbor(board, tileBuilder, minePosition.column + 1, minePosition.row - 1);
		incrementNeighbor(board, tileBuilder, minePosition.column - 1, minePosition.row + 1);
	}

	function incrementNeighbor(board, tileBuilder, neighborColumn, neighborRow) {
		var neighboringTile = board[neighborColumn][neighborRow];
		if(!tileBuilder.isMine(neighboringTile) && !tileBuilder.isBorder(neighboringTile)) {
			tileBuilder.incrementValue(neighboringTile);
		}
	}

	function getMineSeeds(config) {
		var numPositions = config.columns * config.rows;
		var positions = new Array(numPositions);

		for(var i=0; i < numPositions; i++) {
			positions[i] = i;
		}

		for(var j=0; j < config.numMines; j++){
			var position = Math.floor(Math.random() * (numPositions - j) ) + j;
			var value = positions[j]; 
			positions[j] = positions[position];
			positions[position] = value;
		}

		positions.length = config.numMines;

		return positions;
	}

	function calculateMinePositions(config, mineSeeds) {
		var minePositions = [];

		while(mineSeeds.length > 0) {
			var mineSeed = mineSeeds.shift();

			var mineRow = Math.floor(mineSeed / config.columns) + 1;
			var mineColumn = mineSeed % config.columns + 1;

			minePositions.push({row: mineRow, column: mineColumn});
		}

		return minePositions;
	};

	function addMinesToBoard(board, config, tileBuilder) {
		var mineSeeds = getMineSeeds(config);
		var minePositions = calculateMinePositions(config, mineSeeds);

		for(var i=0; i < minePositions.length; i++) {
			var mineSpot = minePositions[i];

			board[mineSpot.column][mineSpot.row] = tileBuilder.createMine(mineSpot.column, mineSpot.row);
			incrementNeighbors(board, tileBuilder, mineSpot);
		}

		board.minePositions = minePositions;
	}

	var builder = {
		newGame: function(config, tileBuilder) {
			var board = this.createEmptyBoard(config.columns, config.rows);
			board.columns = config.columns;
			board.rows = config.rows;

			this.addTilesToBoard(board, tileBuilder);
			addMinesToBoard(board, config, tileBuilder);

			return board;
		},

		createEmptyBoard: function(columns, rows) {
			var borderPadding = 2;
			var underlyingArray = new Array(columns + borderPadding);
			
			for(var column = 0; column < underlyingArray.length; column++) {
				underlyingArray[column] = new Array(rows + borderPadding);
			}

			return underlyingArray;
		},

		//for testing
		addTilesToBoard: function(board, tileBuilder) {
			//don't need to setup the borders if this is a reset of an existing game
			for(var column = 0; column < board.length; column++) {
				for(var row = 0; row < board[column].length; row++) {
					if((column === 0) || (row === 0) || (column === (board.length - 1)) || (row === (board[column].length - 1))) {
						board[column][row] = tileBuilder.createBorder(column, row);
					} else {
						board[column][row] = tileBuilder.createTile(column, row);
					}
				}
			}
		}, 

		//for testing
		generateMines: getMineSeeds
	};

	if(typeof window === 'undefined') {
		module.exports = builder;
	} else {
		define("builder", builder);
	}   
})();