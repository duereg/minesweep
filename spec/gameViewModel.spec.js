describe('With a GameViewModel', function() { 

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js");
    var events = require("../lib/events.js");
    var builder = require("../lib/builder.js"); 
    var config = {columns: 8, rows: 8, numMines: 10};
    var TileViewModel = null;
    var MineViewModel = null;
    var testBoardVm = null;
    var game = null;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;

        MineViewModel = require("../lib/MineViewModel.js");
        TileViewModel = require("../lib/TileViewModel.js");

        var BoardViewModel = require("../lib/BoardViewModel.js");
        testBoardVm = new BoardViewModel();

        var GameViewModel = require("../lib/GameViewModel.js");
        game = new GameViewModel(config, testBoardVm, 32, 32);
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe('when cheating', function() {  
 
        it('if the game has not failed, showMines() will be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.cheat();

           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.showMines, true);
        });

        it('if the game has failed, showMines() will not be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.failure(true)
           game.cheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        }); 
    });

    describe('when uncheating', function() {  

        it('if the game has not failed, hideMines() will be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.uncheat();

           console.log(events.tile.hideMines);
           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.hideMines);
        });

        it('if the game has failed, hideMines() will not be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.failure(true)
           game.cheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        });  
    });
});