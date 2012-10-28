(function(ko, undefined) {

	var convertBoardToKo = function(board) {
			if( !!!board) throw "bad board";

			var vmBoard = new koBoard(board);
			var builder = new window.minesweep.builder(vmBoard);

			builder.createTiles(vmBoard);

			for(var column = 0; column < board.tiles.length; column++) {
				for(var row = 0; row < board.tiles[column].length; row++) {
					var tile = board.tiles[column][row];
					vmBoard.tiles[column][row] = new koTile(column, row, tile, vmBoard.click);
				}
			}

			return vmBoard;
		};

	var koTile = function(column, row, tile, boardClick) {
			this.isMine = ko.observable(tile.isMine);
			this.isCovered = ko.observable(tile.isCovered);
			this.isBorder = ko.observable(tile.isBorder);
			this.value = ko.observable(tile.value);

			this.click = function() {
				if( !!!boardClick) throw("no board click method defined.");
				boardClick(column, row);
			};

			this.isBlank = ko.computed(function() {
				return !this.isBorder() && this.isCovered();
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
			this.tiles = [];
			this.failure = ko.observable(false);

			this.click = function(column, row) {
				var clickedTile = me.tiles[column][row];

				if(clickedTile.isMine()) {
					clickedTile.isCovered(false);
					me.failure(true);
				} else if(clickedTile.isCovered()) {
					//successful move. Uncover all continuous non-mine squares
					uncover(column, row);
				}
			};

			function uncover(column, row) {
				var tileToUncover = me.tiles[column][row];

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
		};

	window.minesweep = window.minesweep || {};
	window.minesweep.convertBoardToKo = convertBoardToKo;
})(ko, undefined);