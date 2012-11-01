describe('When using the builder and calling generateMines()', function() {
    var board = require("../lib/board.js");
    var builder = require("../lib/builder.js");
    var mines = [];

    describe('on a 1x1 board with one mine', function() {

        it('the board will contain 1 mine', function() {
            var newBoard = new board(1, 1, 1); 
            mines = builder.generateMines(newBoard);
            expect(mines.length).toEqual(1);
        }); 
    });

    describe('on a 10x10 board with ten mines', function() {

        it('the board will contain 10 mines', function() {
            var newBoard = new board(10, 10, 10); 
            mines = builder.generateMines(newBoard);
            expect(mines.length).toEqual(10);
        }); 
    });

    describe('on a 10x10 board with 100 mines', function() {

        it('the board will contain 100 mines', function() {
            var newBoard = new board(10, 10, 100); 
            mines = builder.generateMines(newBoard);
            expect(mines.length).toEqual(100);
        }); 
    });
});