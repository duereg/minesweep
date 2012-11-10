describe('When using the boardBuilder and calling generateMines()', function() {
    var boardBuilder = require("../lib/boardBuilder.js");
    var mines = [];

    describe('on a 1x1 Board with one mine', function() {

        it('the Board will contain 1 mine', function() {
            var newBoard = {columns: 1, rows: 1, numMines: 1}; 
            mines = boardBuilder.generateMines(newBoard);
            expect(mines.length).toEqual(1);
        }); 
    });

    describe('on a 10x10 Board with ten mines', function() {

        it('the Board will contain 10 mines', function() {
            var newBoard = {columns: 10, rows: 10, numMines: 10}; 
            mines = boardBuilder.generateMines(newBoard);
            expect(mines.length).toEqual(10);
        }); 
    });

    describe('on a 10x10 Board with 100 mines', function() {

        it('the Board will contain 100 mines', function() {
            var newBoard = {columns: 10, rows: 10, numMines: 100}; 
            mines = boardBuilder.generateMines(newBoard);
            expect(mines.length).toEqual(100);
        });

        it('the list of mines will not contain any duplicates', function() {
            var minePositions = new Array(100); 
            for(var i = 0; i < 100; i++) {
                minePositions[i] = 0; 
            }

            var newBoard = {columns: 10, rows: 10, numMines: 100}; 
            mines = boardBuilder.generateMines(newBoard);

            for(var j = 0; j < 100; j++) {
                var initValue = minePositions[mines[j]];
                expect(initValue).toBe(0);
                minePositions[mines[j]] = initValue + 1;
            }
        });
    });
});