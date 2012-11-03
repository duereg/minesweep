describe('With a gameViewModel', function() { 

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js");
    var board = require("../lib/board.js"); 
    var builder = require("../lib/builder.js"); 
    var testBoard = null;
    var testBoardVm = null;
    var game = null;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;

        testBoard = new board(8, 8, 10);
        // board.tiles = builder.createTiles(8, 8);
        // builder.setupBoard(board);

        var boardViewModel = require("../lib/boardViewModel.js");
        testBoardVm = new boardViewModel();
        //boardVm.import(board);

        var gameViewModel = require("../lib/gameViewModel.js");
        game = new gameViewModel(testBoard, testBoardVm, 32, 32);
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe('when cheating', function() {  
 
        it('if the game has not failed, showMines() will be called on the board.', function() {
           spyOn(testBoardVm, "showMines");

           game.cheat();

           expect(testBoardVm.showMines).toHaveBeenCalled();
        });

        it('if the game has failed, showMines() will not be called on the board.', function() {
           spyOn(testBoardVm, "showMines");

           game.failure(true)
           game.cheat();

           expect(testBoardVm.showMines).not.toHaveBeenCalled();
        }); 
    });

    describe('when uncheating', function() {  

        it('if the game has not failed, hideMines() will be called on the board.', function() {
           spyOn(testBoardVm, "hideMines");

           game.uncheat();

           expect(testBoardVm.hideMines).toHaveBeenCalled();
        });

        it('if the game has failed, hideMines() will not be called on the board.', function() {
           spyOn(testBoardVm, "hideMines");

           game.failure(true)
           game.cheat();

           expect(testBoardVm.hideMines).not.toHaveBeenCalled();
        });  
    });
});