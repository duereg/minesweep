describe('With a BoardViewModel', function() { 

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js");
    var boardBuilder = null; 
    var boardVm = null;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;
        boardBuilder = require("../lib/boardBuilder.js")
        var BoardViewModel = require("../lib/BoardViewModel.js");
        boardVm = new BoardViewModel();
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe('when importing a board', function() {  

        it('of size 10x10 with 10 mines, 10 mines positions will be recorded.', function() {
            var testBoard = boardBuilder(10, 10, 10);
            boardVm.importTiles(testBoard);
            expect(boardVm.minePositions.length).toEqual(10);
        });

        it('of size 1x1 with 1 mine, 1 mine position will be recorded.', function() {
            var testBoard = boardBuilder(1, 1, 1);
            boardVm.importTiles(testBoard);
            expect(boardVm.minePositions.length).toEqual(1);
        });

        it('of size 10x10 with 10 mines, a 12x12 tile array will be created.', function() {
            var testBoard = boardBuilder(10, 10, 10);
            boardVm.importTiles(testBoard);
            expect(boardVm.tiles().length).toEqual(12);
            expect(boardVm.tiles()[0].length).toEqual(12);
        });

        it('of size 1x1 with 1 mine, 3x3 tile array will be created.', function() {
            var testBoard = boardBuilder(1, 1, 1);
            boardVm.importTiles(testBoard);
            expect(boardVm.tiles().length).toEqual(3);
            expect(boardVm.tiles()[0].length).toEqual(3);
        });
    });
});