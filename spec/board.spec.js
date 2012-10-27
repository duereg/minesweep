var board = require("../lib/board.js");


describe('When creating a board', function () {
	  
	describe('a 10x10 board with ten mines', function () {
		  
		it('the board will have 12 tile columns', function () { 
			var newBoard = new board(10, 10, 10);
			expect(newBoard.tiles.length).toEqual(12);
		});
	 
		it('the board will have 12 tile rows', function () { 
			var newBoard = new board(10, 10, 10);
			expect(newBoard.tiles[0].length).toEqual(12);
		});
  
		it('the number of mines will be 10', function () { 
			var newBoard = new board(10, 10, 10);
			expect(newBoard.numMines).toEqual(10);
		}); 
	});
});


describe('After calling newGame()', function () {
	  
	describe('on a 10x10 board with ten mines', function () {
			 
		var newBoard = new board(10, 10, 10);

		beforeEach(function() {		
			newBoard.newGame();
		});  

		it('the 1st row will be a row of border tiles', function () {  
			for(var column = 0; column < newBoard.tiles.length; column++) {
				expect(newBoard.tiles[column][0].isBorder).toBe(true);
			}
		});

		it('the last row will be a row of border tiles', function () {  
			for(var column = 0; column < newBoard.tiles.length; column++) {
				expect(newBoard.tiles[column][11].isBorder).toBe(true);
			}
		});

		it('the 1st column will be a column of border tiles', function () {  
			for(var row = 0; row < newBoard.tiles[0].length; row++) {
				expect(newBoard.tiles[0][row].isBorder).toBe(true);
			}
		});

		it('the last column will be a column of border tiles', function () { 
			for(var row = 0; row < newBoard.tiles[11].length; row++) {
				expect(newBoard.tiles[11][row].isBorder).toBe(true);
			}
		});
	});
});