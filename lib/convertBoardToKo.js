(function(ko, undefined) {

	var define = require("./define.js");
	var koTile = require("./koTile.js");
	var koBoard = require("./koBoard.js");
	var builder = require("./builder.js");
	var boardBuilder = require("./boardBuilder.js");

	var convertBoard = function(board) {  
		return convertBoardToKo(board, new koBoard(board));
	};

	var convertBoardToKo = function(board, vmBoard) {
		if( !!!board) throw "bad board";

		var underlyingTiles = builder.createTiles(board);

		for(var column = 0; column < board.tiles.length; column++) {
			for(var row = 0; row < board.tiles[column].length; row++) {
				var tile = board.tiles[column][row];
				underlyingTiles[column][row] = new koTile(column, row, tile, vmBoard.click);
			}
		}

		vmBoard.tiles.removeAll();
		vmBoard.tiles(underlyingTiles);

		return vmBoard;
	};

	var koBoard = function(board) {
		if( !!!board) throw "bad board";

		var me = this;

		this.columns = board.columns;
		this.rows = board.rows;
		this.numMines = board.numMines;
		this.tiles = ko.observableArray();
		this.failure = ko.observable(false);

		function uncover(column, row) {
			var tileToUncover = me.tiles()[column][row];

			if(!tileToUncover.isBorder() && !tileToUncover.isMine() && tileToUncover.isCovered()) {
				//raise event here?
				tileToUncover.isCovered(false);

				if(tileToUncover.value() === 0) {
					//don't need to uncover diagonals as the recursive call will handle it.
					uncover(column - 1, row);
					uncover(column + 1, row);
					uncover(column, row - 1);
					uncover(column, row + 1);
				}
			}
		};

		this.click = function(column, row) {
			var clickedTile = me.tiles()[column][row];

			if(clickedTile.isMine()) {
				clickedTile.isCovered(false);
				me.failure(true);
			} else if(clickedTile.isCovered()) {
				//successful move. Uncover all continuous non-mine squares
				uncover(column, row);
			}
		};

		this.updateBoard = function() {
		    me.columns = parseInt(this.columns);
		    me.rows = parseInt(this.rows);
		    me.numMines = parseInt(this.numMines);
		    
			var board = boardBuilder(me.columns, me.rows, me.numMines); 
			convertBoardToKo(board, me);
		}
	};

	if(typeof window === 'undefined') {
		module.exports = convertBoard;
	} else {
		define("koBoard", koBoard);
		define("convertBoardToKo", convertBoard);
	}
})(ko, undefined);