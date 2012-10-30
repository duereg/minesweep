describe('After calling setupBoard() on the builder', function () {

	var board = require("../lib/board.js");
	var builder = require("../lib/builder.js");

	describe('on a 10x10 board', function () {
		var newBoard = new board(10, 10, 10); 
		 
		beforeEach(function() {	
			newBoard.tiles = builder.createTiles(10, 10);	
			builder.setupBoard(newBoard);
		});  

		describe('the borders will be', function () {

			it('the 1st row', function () {  
				for(var column = 0; column < newBoard.tiles.length; column++) {
					expect(newBoard.tiles[column][0].isBorder).toBe(true);
				}
			});

			it('the last row', function () {  
				for(var column = 0; column < newBoard.tiles.length; column++) {
					expect(newBoard.tiles[column][11].isBorder).toBe(true);
				}
			});

			it('the 1st column', function () {  
				for(var row = 0; row < newBoard.tiles[0].length; row++) {
					expect(newBoard.tiles[0][row].isBorder).toBe(true);
				}
			});

			it('the last column', function () { 
				for(var row = 0; row < newBoard.tiles[11].length; row++) {
					expect(newBoard.tiles[11][row].isBorder).toBe(true);
				}
			});
		});
	});	
});