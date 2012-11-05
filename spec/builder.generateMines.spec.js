describe('When using the builder and calling generateMines()', function() {
    var Board = require("../lib/Board.js");
    var builder = require("../lib/builder.js");
    var mines = [];

    describe('on a 1x1 Board with one mine', function() {

        it('the Board will contain 1 mine', function() {
            var newBoard = new Board(1, 1, 1); 
            mines = builder.generateMines(newBoard);
            expect(mines.length).toEqual(1);
        }); 
    });

    describe('on a 10x10 Board with ten mines', function() {

        it('the Board will contain 10 mines', function() {
            var newBoard = new Board(10, 10, 10); 
            mines = builder.generateMines(newBoard);
            expect(mines.length).toEqual(10);
        }); 
    });

    describe('on a 10x10 Board with 100 mines', function() {

        it('the Board will contain 100 mines', function() {
            var newBoard = new Board(10, 10, 100); 
            mines = builder.generateMines(newBoard);
            expect(mines.length).toEqual(100);
        });

        it('the list of mines will not contain any duplicates', function() {
            var minePositions = new Array(100); 
            for(var i = 0; i < 100; i++) {
                minePositions[i] = 0; 
            }

            var newBoard = new Board(10, 10, 100); 
            mines = builder.generateMines(newBoard);

            for(var j = 0; j < 100; j++) {
                var initValue = minePositions[mines[j]];
                expect(initValue).toBe(0);
                minePositions[mines[j]] = initValue + 1;
            }
        });
    });
});