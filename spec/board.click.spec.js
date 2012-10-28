
// describe('After creating a board', function() {

// 	describe('and calling the click() function', function() {
// 		var board = require("../lib/board.js");
// 		var builder = require("../lib/builder.js");

// 		var newBoard = new board(10, 10, 10); 

// 		beforeEach(function() {

// 			builder.createTiles(newBoard);
// 			builder.setupBoard(newBoard); //Setup board but do not add mines
// 		});

// 		it('if you click on a mine, the failure event will be called.', function() {
// 			spyOn(newBoard, 'failure')

// 			builder.addMine(newBoard, 5, 5);
// 			newBoard.click(5, 5);

// 			expect(newBoard.failure).toHaveBeenCalled();
// 		});

// 		it('if you click on a tile that is not a border and not a mine, then the tile will become uncovered.', function() {
// 			expect(newBoard.tiles[5][5].isCovered()).toBe(true);

// 			newBoard.click(5, 5);

// 			expect(newBoard.tiles[5][5].isCovered()).toBe(false);
// 		});
// 	});
// });