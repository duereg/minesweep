describe('When using the builder', function() {

	describe('to create tiles on a 10x10 board', function() {
		var board = require("../lib/board.js");
		var builder = require("../lib/builder.js");
		var newBoard = new board(10, 10, 10); 
		
		beforeEach(function() {
			newBoard.tiles = builder.createTiles(10, 10);
		});

		it('the board will have 12 columns (10 columns + 2 borders)', function() {
			expect(newBoard.tiles.length).toEqual(12);
		});

		it('the board will have 12 rows (10 rows + 2 borders)', function() { 
			expect(newBoard.tiles[0].length).toEqual(12);
		});
	});
});