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
		this.minePositions = []; 

		this.tiles = ko.observableArray();
		this.failure = ko.observable(false);
		this.success = ko.observable(false);
		this.minesTagged = ko.observable(0);
		this.tilesCovered = ko.observable(this.columns * this.rows);

		this.canValidate = ko.computed(function() {
			return (me.tilesCovered() === me.numMines) || (me.minesTagged() === me.numMines);
		});

		this.tilesLeftAndTagged = ko.computed(function() {
			return me.tilesCovered() + me.minesTagged(); 
		});

		this.minesLeft = ko.computed(function() {
			return me.numMines - me.minesTagged();
		});

		this.tilesLeft = ko.computed(function() {
			return me.tilesCovered() - me.minesTagged();
		});

		amplify.subscribe(koTile.explodedEvent, me.failure);
		amplify.subscribe(koTile.uncoverEvent, uncover);
		amplify.subscribe(koTile.tagEvent, toggleTag);

		function toggleTag(column, row) {
			var tileToToggle = me.tiles()[column][row];

			if(tileToToggle.isTagged()) {
				if(me.numMines > me.minesTagged()) {
					me.minesTagged(me.minesTagged() + 1);
				} else {
					tileToToggle.isTagged(false);
				}
			} else {
				me.minesTagged(me.minesTagged() - 1);
			}
		}

		function uncover(column, row, start) {
			var tileToUncover = me.tiles()[column][row];

			if(!tileToUncover.isBorder() && !tileToUncover.isMine() && (tileToUncover.isCovered() || start)) { 
				tileToUncover.isCovered(false);
				me.tilesCovered(me.tilesCovered() - 1);

				if(tileToUncover.value() === 0) { 
					uncover(column - 1, row, false);
					uncover(column + 1, row, false);
					uncover(column, row - 1, false);
					uncover(column, row + 1, false);

					uncover(column - 1, row - 1, false);
					uncover(column + 1, row + 1, false);
					uncover(column + 1, row - 1, false);
					uncover(column - 1, row + 1, false);
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

		this.resetBoard = function() {
			me.success(false);
			me.failure(false);
		    me.columns = parseInt(this.columns);
		    me.rows = parseInt(this.rows);
		    me.numMines = parseInt(this.numMines);
		    me.tilesCovered( me.columns * me.rows);
		    me.minesTagged(0);
		    
			var board = boardBuilder(me.columns, me.rows, me.numMines); 
			me.import(board);
		};

		this.validateGame = function() {
			var isValid = true;
			if((me.minesTagged() === me.numMines) && (me.minesTagged() !== me.tilesCovered())) {
				for(var i = 0; i < me.minePositions.length; i++) {
					var position = me.minePositions[i];
					var tile = me.tiles()[position.column][position.row];
					if(!tile.isTagged()) {
						isValid = false;
						break;
					} 
				}
			}
			me.success(isValid);
			me.failure(!isValid);
		};

		this.import = function(board) {
			if( !!!board) throw "bad board";

			me.minePositions = [];
			var underlyingTiles = builder.createTiles(board.columns, board.rows);

			for(var column = 0; column < board.tiles.length; column++) {
				for(var row = 0; row < board.tiles[column].length; row++) {
					var tile = board.tiles[column][row];
					if(tile.isMine) {
						me.minePositions.push({column: column, row: row});
					}
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