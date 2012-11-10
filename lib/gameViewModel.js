/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function(ko, amplify, undefined) {
	'use strict';

	var define = require("./define.js");
	var events = require("./events.js");

	var gameViewModel = function(board, boardVm, maxRows, maxColumns) {
		if( !! !board) throw "bad board";

		var me = this;
		var boardSize = 512;

		this.maxColumns = maxColumns;
		this.maxRows = maxRows;

		this.cheating = false;
		this.columns = ko.observable(board.columns);
		this.rows = ko.observable(board.rows);
		this.numMines = ko.observable(board.numMines);
		this.minesTagged = ko.observable(0);
		this.tilesCovered = ko.observable(this.columns() * this.rows());
		this.failure = ko.observable(false);
		this.success = ko.observable(false);

		this.maxMines = ko.computed(function() {
			return me.columns() * me.rows();
		});

		this.tilesLeft = ko.computed(function() {
			return me.tilesCovered() - me.minesTagged();
		});

		this.tooFewMines = ko.computed(function() {
			return me.numMines() < 1;
		});

		this.tooFewColumns = ko.computed(function() {
			return me.columns() < 2;
		});

		this.tooFewRows = ko.computed(function() {
			return me.rows() < 2;
		});

		this.tooManyMines = ko.computed(function() {
			return(me.columns() > 0) && (me.rows() > 0) && (me.maxMines()) < me.numMines();
		});

		this.tooManyColumns = ko.computed(function() {
			return me.columns() > me.maxColumns;
		});

		this.tooManyRows = ko.computed(function() {
			return me.rows() > me.maxRows;
		});

		this.gameIsValid = ko.computed(function() {
			var isValid = !me.tooManyMines() && !me.tooFewRows() && !me.tooFewColumns() && !me.tooFewMines() && !me.tooManyRows() && !me.tooManyColumns();

			amplify.publish(events.game.isValid, isValid);

			return isValid;
		});

		this.canValidate = ko.computed(function() {
			var isValid = !me.failure() && (me.tilesCovered() === me.numMines()) || (me.minesTagged() === me.numMines());

			amplify.publish(events.game.canValidate, isValid);

			return isValid;
		});

		function uncover() {
			me.tilesCovered(me.tilesCovered() - 1);
		}

		function toggleTag(tileToToggle) {
			if(!me.cheating) {
				if(tileToToggle.isTagged()) {
					if(!me.failure() && (me.numMines() > me.minesTagged())) {
						me.minesTagged(me.minesTagged() + 1);
					} else {
						tileToToggle.isTagged(false);
					}
				} else {
					me.minesTagged(me.minesTagged() - 1);
				}
			}
		}

		this.resetBoard = function() {
			if(me.gameIsValid()) {
				me.success(false);
				me.failure(false);
				me.columns(parseInt(me.columns(), 10));
				me.rows(parseInt(me.rows(), 10));
				me.numMines(parseInt(this.numMines(), 10));
				me.tilesCovered(me.columns() * me.rows());
				me.minesTagged(0);

				boardVm.newGame(me.columns(), me.rows(), me.numMines());
				me.resizeTiles();
			}
		};

		this.validateGame = function() {
			if(me.canValidate()) {
				var isValid = true;
				if((me.minesTagged() === me.numMines()) && (me.minesTagged() !== me.tilesCovered())) {
					isValid = boardVm.allMinesAreTagged();
				}
				me.success(isValid);
				me.failure(!isValid);

				if(isValid) {
					amplify.publish(events.tile.disarm);
				}

				amplify.publish(events.tile.showMines, false);
			}
		};

		this.cheat = function() {
			if(!me.failure() && !me.success()) {
				me.cheating = true;
				amplify.publish(events.tile.showMines, true);
			}
		};

		this.uncheat = function() {
			if(!me.failure() && !me.success()) {
				amplify.publish(events.tile.hideMines);
				me.cheating = false;
			}
		};

		this.resizeTiles = function() {
			var tileSize = 16;

			if( me.columns() > me.rows()) {
				tileSize = boardSize / me.columns();
			} else {
				tileSize = boardSize / me.rows();
			}
			
			if( tileSize < 16 ){ 
				tileSize = 16;
			} 

			amplify.publish(events.tile.resize, tileSize);
		};

		amplify.subscribe(events.tile.tag, toggleTag);
		amplify.subscribe(events.tile.exploded, me.failure);
		amplify.subscribe(events.board.uncover, uncover);
		me.resizeTiles();
	};

	module.exports = gameViewModel;
})(ko, amplify);