describe('After calling newGame()', function () {

	var board = require("../lib/board.js");
	var builder = require("../lib/builder.js");

	describe('on a 10x10 board with ten mines', function () {
		var newBoard = new board(10, 10, 10);
		var boardBuilder = new builder(newBoard);
			 
		describe('the borders will be', function () {

			beforeEach(function() {		
				boardBuilder.newGame();
			});  

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
 
		describe('the mines will', function () { 
			
			beforeEach(function() {
				boardBuilder.newGame();
			});

			it('number ten', function () {  
				var numMines = 0;

				for(var column = 0; column < newBoard.tiles.length; column++) {
					for(var row = 0; row < newBoard.tiles[column].length; row++) { 
						if(newBoard.tiles[column][row].isMine) {
							numMines++;
						}
					}
				}

				expect(numMines).toEqual(10);
			});

			it('have neighbors with value greater than 0', function() {
				for(var column = 0; column < newBoard.tiles.length; column++) {
					for(var row = 0; row < newBoard.tiles[column].length; row++) { 
						if(newBoard.tiles[column][row].isMine) {
							checkNeighborTile(column -1, row);
							checkNeighborTile(column +1, row);
							checkNeighborTile(column, row - 1);
							checkNeighborTile(column, row + 1);
							checkNeighborTile(column -1, row + 1);
							checkNeighborTile(column +1, row + 1);
							checkNeighborTile(column +1, row - 1);
							checkNeighborTile(column -1, row - 1);
						}
					}
				}  
			});

			function checkNeighborTile(column, row) {
				if(!newBoard.tiles[column][row].isBorder && !newBoard.tiles[column][row].isMine) {
					expect(newBoard.tiles[column][row].value).toBeGreaterThan(0);
				}
			} 
		});	
	});	
});