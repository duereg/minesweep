(function(ko, amplify, undefined) {

	var define = require("./define.js");
	var koTile = require("./koTile.js"); 
	var builder = require("./builder.js");
	var boardBuilder = require("./boardBuilder.js");

	var koBoard = function(board) {
		if( !!!board) throw "bad board";

		var me = this;

		this.columns = board.columns;
		this.rows = board.rows;
		this.numMines = board.numMines;
		this.tiles = ko.observableArray();
		this.failure = ko.observable(false);
		this.minesTagged = ko.observable(0);

		this.minesLeft = ko.computed(function() {
			return me.numMines - me.minesTagged();
		});

		amplify.subscribe(koTile.explodedEvent, me.failure);

		amplify.subscribe(koTile.uncoverEvent, uncover);

		amplify.subscribe(koTile.tagEvent, function(isTagged) {
			if(isTagged) {
				me.minesTagged(me.minesTagged() + 1);
			} else {
				me.minesTagged(me.minesTagged() - 1);
			}
		});

		function untag(column, row) {
			var tileToUntag = me.tiles()[column][row];

			if(tileToUntag.isTagged()) {
				tileToUntag.isTagged(false);
				me.minesTagged(me.minesTagged() - 1);
			}
		}

		function uncover(column, row, start) {
			var tileToUncover = me.tiles()[column][row];

			if(!tileToUncover.isBorder() && !tileToUncover.isMine() && (tileToUncover.isCovered() || start)) { 
				tileToUncover.isCovered(false);

				if(tileToUncover.value() === 0) {
					//don't need to uncover diagonals as the recursive call will handle it.
					uncover(column - 1, row, false);
					uncover(column + 1, row, false);
					uncover(column, row - 1, false);
					uncover(column, row + 1, false);
				}
			}
		};

		this.click = function(column, row) {
			var clickedTile = me.tiles()[column][row];

			uncover(column, row); 

			if(clickedTile.isMine()) {
				me.failure(true);
			} 
		};

		this.updateBoard = function() {
			me.failure(false);
		    me.columns = parseInt(this.columns);
		    me.rows = parseInt(this.rows);
		    me.numMines = parseInt(this.numMines);
		    
			var board = boardBuilder(me.columns, me.rows, me.numMines); 
			me.import(board);
		};

		this.validateGame = function() {
			//TODO: Add validate feature
		};

		this.import = function(board) {
			if( !!!board) throw "bad board";

			var underlyingTiles = builder.createTiles(board.columns, board.rows);

			for(var column = 0; column < board.tiles.length; column++) {
				for(var row = 0; row < board.tiles[column].length; row++) {
					var tile = board.tiles[column][row];
					underlyingTiles[column][row] = new koTile(column, row, tile, me.click);
				}
			}

			me.tiles.removeAll();
			me.tiles(underlyingTiles); 
		};

		this.import(board);
	};

	if(typeof window === 'undefined') {
		module.exports = koBoard;
	} else {
		define("koBoard", koBoard); 
	}
})(ko, amplify);