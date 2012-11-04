describe('With a gameViewModel', function() { 

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js");
    var events = require("../lib/events.js"); 
    var board = require("../lib/board.js"); 
    var builder = require("../lib/builder.js"); 
    var tileViewModel = null;
    var mineViewModel = null;
    var testBoard = null;
    var testBoardVm = null;
    var game = null;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;

        testBoard = new board(8, 8, 10);

        mineViewModel = require("../lib/mineViewModel.js");
        tileViewModel = require("../lib/tileViewModel.js");

        var boardViewModel = require("../lib/boardViewModel.js");
        testBoardVm = new boardViewModel();

        var gameViewModel = require("../lib/gameViewModel.js");
        game = new gameViewModel(testBoard, testBoardVm, 32, 32);
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe('when cheating', function() {  
 
        it('if the game has not failed, showMines() will be called on the board.', function() {
           spyOn(global.amplify, "publish");

           game.cheat();

           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.showMines, true);
        });

        it('if the game has failed, showMines() will not be called on the board.', function() {
           spyOn(global.amplify, "publish");

           game.failure(true)
           game.cheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        }); 
    });

    describe('when uncheating', function() {  

        it('if the game has not failed, hideMines() will be called on the board.', function() {
           spyOn(global.amplify, "publish");

           game.uncheat();

           console.log(events.tile.hideMines);
           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.hideMines);
        });

        it('if the game has failed, hideMines() will not be called on the board.', function() {
           spyOn(global.amplify, "publish");

           game.failure(true)
           game.cheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        });  
    });
});