/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function(ko, amplify, undefined) {
	'use strict';

	var define = require("./define.js");
	var events = require("./events.js");
	var boardFactory = require("./boardFactory.js");

	/*jshint validthis: true */
	var boardViewModel = function() { 
		var me = this;

		this.mineStates = [];
		this.minePositions = []; 
		this.tiles = ko.observableArray();

		function uncover(column, row, start) {
			var tileToUncover = me.tiles()[column][row];

			if((typeof tileToUncover.value !== 'undefined') && (tileToUncover.isCovered() || start)) { 
				tileToUncover.uncover(false);

				amplify.publish(events.board.uncover);

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
		}

		this.newGame = function(columns, rows, numMines) {
			amplify.publish(events.tile.destroy); 
			var board = boardFactory(columns, rows, numMines); 
			me.importTiles(board);
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

		this.importTiles = function(board) {
			if( !!!board) throw "bad board";

			me.minePositions = board.minePositions;
			me.tiles.removeAll();
			me.tiles(board); 
		}; 
		
		amplify.subscribe(events.tile.uncover, uncover);  
	};

	module.exports = boardViewModel;
})(ko, amplify);