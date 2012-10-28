(function(ko, undefined) {

	var convertBoardToKo = function(board, vmBoard) {
		if( !!!board) throw "bad board";

		if(vmBoard === undefined) {
			vmBoard = new koBoard(board);
		} 

		var underlyingTiles = window.minesweep.builder.createTiles(board);

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

	var koTile = function(column, row, tile, boardClick) {
		this.value = ko.observable(tile.value);
		this.isMine = ko.observable(tile.isMine);
		this.isCovered = ko.observable(tile.isCovered);
		this.isBorder = ko.observable(tile.isBorder);
		this.isTagged = ko.observable(false);

		this.click = function( ) { 
			if( !!!boardClick) throw("no board click method defined.");
			boardClick(column, row);
		};

		this.tag = function() {
			if(this.isCovered()) {
				this.isTagged( !this.isTagged());
			}
		}.bind(this);

		this.isBlank = ko.computed(function() {
			return !this.isBorder() && this.isCovered() && !this.isTagged();
		}, this);

		this.showValue = ko.computed(function() {
			return !this.isMine() && !this.isBorder() && !this.isCovered();
		}, this);

		this.showMine = ko.computed(function() {
			return this.isMine() && !this.isCovered();
		}, this);
	};

	var koBoard = function(board) {
		if( !!!board) throw "bad board";

		var me = this;

		this.columns = board.columns;
		this.rows = board.rows;
		this.numMines = board.numMines;
		this.tiles = ko.observableArray();
		this.failure = ko.observable(false);

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

		this.updateBoard = function() {
		    me.columns = parseInt(this.columns);
		    me.rows = parseInt(this.rows);
		    me.numMines = parseInt(this.numMines);
		    
			var board = window.minesweep.boardBuilder(me.columns, me.rows, me.numMines); 
			convertBoardToKo(board, me);
		}
	};

	window.minesweep = window.minesweep || {};
	window.minesweep.convertBoardToKo = convertBoardToKo;
})(ko, undefined);