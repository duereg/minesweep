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

    describe('when importing a board', function() {  

        it('of size 10x10 with 10 mines, 10 mines positions will be recorded.', function() {
            var testBoard = boardBuilder(10, 10, 10);
            boardVm.import(testBoard);
            expect(boardVm.minePositions.length).toEqual(10);
        });
    });
});