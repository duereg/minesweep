describe('When creating a board', function() {

	describe('a 10x10 board with ten mines', function() {
		var board = require("../lib/board.js");
		var builder = require("../lib/builder.js");
		var newBoard = new board(10, 10, 10); 
		
		beforeEach(function() {
			newBoard.tiles = builder.createTiles(newBoard);
		});

		it('the board will have 12 tile columns', function() {
			expect(newBoard.tiles.length).toEqual(12);
		});

		it('the board will have 12 tile rows', function() { 
			expect(newBoard.tiles[0].length).toEqual(12);
		});

		it('the number of mines will be 10', function() { 
			expect(newBoard.numMines).toEqual(10);
		});
	});
});