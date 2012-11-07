describe('When using the builder', function() {

	describe('to create tiles on a 10x10 Board', function() {
		var builder = require("../lib/builder.js");
		
		beforeEach(function() {
			newBoard.tiles = builder.createEmptyBoard(10, 10);
		});

		it('the Board will have 12 columns (10 columns + 2 borders)', function() {
			expect(newBoard.tiles.length).toEqual(12);
		});

		it('the Board will have 12 rows (10 rows + 2 borders)', function() { 
			expect(newBoard.tiles[0].length).toEqual(12);
		});
	});
});