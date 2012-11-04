(function(ko, amplify, undefined) {

	var define = require("./define.js");
	var tileViewModel = require("./tileViewModel.js"); 
	var boardViewModel = require("./boardViewModel.js"); 

	var gameViewModel = function(board, boardVm, maxRows, maxColumns) {
		if( !!!board) throw "bad board";

		var me = this;

		this.maxColumns = maxColumns;
		this.maxRows = maxRows;

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
		})

		this.tooFewColumns = ko.computed(function() {
			return me.columns()  < 1;
		})

		this.tooFewRows = ko.computed(function() {
			return me.rows() < 1;
		})

		this.tooManyMines = ko.computed(function() {
			return (me.columns() > 0) && (me.rows() > 0) && (me.maxMines()) < me.numMines();
		});

		this.tooManyColumns = ko.computed(function() {
			return me.columns() > me.maxColumns;
		});

		this.tooManyRows = ko.computed(function() {
			return me.rows() > me.maxRows;
		});

		this.gameIsValid = ko.computed(function() {
			return !me.tooManyMines() && !me.tooFewRows() && !me.tooFewColumns() && !me.tooFewMines() && !me.tooManyRows() && !me.tooManyColumns();
		});

		this.canValidate = ko.computed(function() {
			return !me.failure() && (me.tilesCovered() === me.numMines()) || (me.minesTagged() === me.numMines());
		});

		function uncover() {
			me.tilesCovered(me.tilesCovered() - 1);
		};

		function toggleTag(tileToToggle) { 
			if(tileToToggle.isTagged()) {
				if(!me.failure() && (me.numMines() > me.minesTagged()))  {
					me.minesTagged(me.minesTagged() + 1);
				} else {
					tileToToggle.isTagged(false);
				}
			} else {
				me.minesTagged(me.minesTagged() - 1);
			}
		};

		this.resetBoard = function() {
			if(me.gameIsValid()) {
				me.success(false);
				me.failure(false);
			    me.columns(parseInt(me.columns()));
			    me.rows(parseInt(me.rows()));
			    me.numMines(parseInt(this.numMines()));
			    me.tilesCovered( me.columns() * me.rows());
			    me.minesTagged(0);
			    
			    boardVm.reset(me.columns(), me.rows(), me.numMines());
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

				//should show mines, but also show they are disarmed
				//boardVm.showMines(false);
			}
		};

		this.cheat = function() {
			if(!me.failure()) {
				boardVm.showMines(true);
			}
		};

		this.uncheat = function() {
			if(!me.failure()) {
				boardVm.hideMines();
			} 
		};

		amplify.subscribe(tileViewModel.tagEvent, toggleTag);
		amplify.subscribe(tileViewModel.explodedEvent, me.failure);
		amplify.subscribe(boardViewModel.uncoverEvent, uncover);
	}

	if(typeof window === 'undefined') {
		module.exports = gameViewModel;
	} else {
		define("gameViewModel", gameViewModel); 
	}
})(ko, amplify);