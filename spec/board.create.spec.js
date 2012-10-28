var board = require("../lib/board.js");

describe('When creating a board', function() {

	describe('a 10x10 board with ten mines', function() {

		it('the board will have 12 tile columns', function() {
			var newBoard = new board(10, 10, 10);
			expect(newBoard.tiles.length).toEqual(12);
		});

		it('the board will have 12 tile rows', function() {
			var newBoard = new board(10, 10, 10);
			expect(newBoard.tiles[0].length).toEqual(12);
		});

		it('the number of mines will be 10', function() {
			var newBoard = new board(10, 10, 10);
			expect(newBoard.numMines).toEqual(10);
		});
	});
});