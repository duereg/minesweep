describe('With a boardViewModel', function() { 

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js");
    var boardBuilder = require("../lib/boardBuilder.js"); 
    var boardVm = null;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;
        var boardViewModel = require("../lib/boardViewModel.js");
        boardVm = new boardViewModel();
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe('when resetting a board', function() {  

        it('to a board of size 16x16 with 50 mines, 50 mines positions will be recorded.', function() {
            boardVm.reset(16, 16, 50);
            expect(boardVm.minePositions.length).toEqual(50);
        });

        it('to a board of size 10x10 with 10 mines, 10 mines positions will be recorded.', function() {
            boardVm.reset(10, 10, 10);
            expect(boardVm.minePositions.length).toEqual(10);
        });

        it('to a board of size 1x1 with 1 mine, 1 mine position will be recorded.', function() {
            boardVm.reset(1, 1, 1);
            expect(boardVm.minePositions.length).toEqual(1);
        });

        it('to a board of size 10x10 with 10 mines, a 12x12 tile array will be created.', function() {
            boardVm.reset(10, 10, 10);
            expect(boardVm.tiles().length).toEqual(12);
            expect(boardVm.tiles()[0].length).toEqual(12);
        });

        it('to a board of size 1x1 with 1 mine, 3x3 tile array will be created.', function() {
            boardVm.reset(1, 1, 1);
            expect(boardVm.tiles().length).toEqual(3);
            expect(boardVm.tiles()[0].length).toEqual(3);
        });
    });
});