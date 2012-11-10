describe('With a BoardViewModel', function() { 

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js");
    var boardFactory = null; 
    var boardVm = null;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;
        boardFactory = require("../lib/boardFactory.js")
        var BoardViewModel = require("../lib/BoardViewModel.js");
        boardVm = new BoardViewModel();
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe('when starting a new game', function() {  

        it('with a board of size 16x16 with 50 mines, 50 mines positions will be recorded.', function() {
            boardVm.newGame(16, 16, 50);
            expect(boardVm.minePositions.length).toEqual(50);
        });

        it('with a board of size 10x10 with 10 mines, 10 mines positions will be recorded.', function() {
            boardVm.newGame(10, 10, 10);
            expect(boardVm.minePositions.length).toEqual(10);
        });

        it('with a board of size 1x1 with 1 mine, 1 mine position will be recorded.', function() {
            boardVm.newGame(1, 1, 1);
            expect(boardVm.minePositions.length).toEqual(1);
        });

        it('with a board of size 10x10 with 10 mines, a 12x12 tile array will be created.', function() {
            boardVm.newGame(10, 10, 10);
            expect(boardVm.tiles().length).toEqual(12);
            expect(boardVm.tiles()[0].length).toEqual(12);
        });

        it('with a board of size 1x1 with 1 mine, a 3x3 tile array will be created.', function() {
            boardVm.newGame(1, 1, 1);
            expect(boardVm.tiles().length).toEqual(3);
            expect(boardVm.tiles()[0].length).toEqual(3);
        });
    });
});