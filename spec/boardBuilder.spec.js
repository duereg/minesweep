var boardBuilder = require("../lib/boardBuilder.js");

describe('When creating a board from the boardBuilder', function() {

	it('tiles will be defined', function() {
		var board = boardBuilder(10, 10, 10);

		expect(board.tiles).toBeDefined();
	});

	it('newGame will not be defined', function() {
		var board = boardBuilder(10, 10, 10);

		expect(board.newGame).not.toBeDefined();
	}); 
});