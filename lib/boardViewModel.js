(function(ko, amplify, undefined) {

	var define = require("./define.js");
	var tileViewModel = require("./tileViewModel.js");
	var builder = require("./builder.js");
	var boardBuilder = require("./boardBuilder.js");

	var uncoverEvent = "board.uncover";

	var boardViewModel = function() { 
		var me = this;

		this.mineStates = [];
		this.minePositions = []; 
		this.tiles = ko.observableArray();

		function uncover(column, row, start) {
			var tileToUncover = me.tiles()[column][row];

			if(!tileToUncover.isBorder() && !tileToUncover.isMine() && (tileToUncover.isCovered() || start)) { 
				tileToUncover.uncover();

				amplify.publish(uncoverEvent)

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
 
		this.showMines = function(recordState) { 
			for(var i = 0; i < me.minePositions.length; i++) {
				var position = me.minePositions[i];
				var tile = me.tiles()[position.column][position.row];
				if(recordState) {
					me.mineStates[i] = tile.isTagged();
				}
				tile.uncover();
			} 
		};

		this.hideMines = function () {
			for(var i = 0; i < me.minePositions.length; i++) {
				var position = me.minePositions[i];
				var tile = me.tiles()[position.column][position.row];
				tile.isTagged(me.mineStates[i]);
				tile.isCovered(true);
			}  
			me.mineStates.length = 0;
		}

		this.reset = function(columns, rows, numMines) {
			var board = boardBuilder(columns, rows, numMines); 
			me.import(board);
		};

		this.allMinesAreTagged = function() {
			var isValid = true;
			for(var i = 0; i < me.minePositions.length; i++) {
				var position = me.minePositions[i];
				var tile = me.tiles()[position.column][position.row];
				if(!tile.isTagged()) {
					isValid = false;
					break;
				} 
			}
			return isValid;
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
					underlyingTiles[column][row] = new tileViewModel(column, row, tile);
				}
			}

			me.tiles.removeAll();
			me.tiles(underlyingTiles); 
		}; 
		
		amplify.subscribe(tileViewModel.uncoverEvent, uncover); 
		amplify.subscribe(tileViewModel.explodedEvent, me.showMines);
	};

	boardViewModel.uncoverEvent = uncoverEvent;

	if(typeof window === 'undefined') {
		module.exports = boardViewModel;
	} else {
		define("boardViewModel", boardViewModel); 
	}
})(ko, amplify);