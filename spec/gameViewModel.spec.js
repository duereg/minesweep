describe('With a GameViewModel', function() { 

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js");
    var events = require("../lib/events.js");
    var boardBuilder = require("../lib/boardBuilder.js"); 
    var config = {columns: 8, rows: 8, numMines: 10};
    var TileViewModel = null;
    var MineViewModel = null;
    var testBoardVm = null;
    var game = null;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;

        MineViewModel = require("../lib/mineViewModel.js");
        TileViewModel = require("../lib/tileViewModel.js");

        var BoardViewModel = require("../lib/boardViewModel.js");
        testBoardVm = new BoardViewModel();

        var GameViewModel = require("../lib/gameViewModel.js");
        game = new GameViewModel(config, testBoardVm, 32, 32);
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe("when calling validateGame()", function() {
      it("if canValidate() is false, nothing happens", function() {

      });

      describe("if canValidate() is true", function() {
        it("if all tiles have been uncovered but mines, the game will be a success", function() {

        });

        it("if all the mines have been tagged, the game will be a success", function() {

        });

        it("if tiles were incorrectly tagged as mines, the game will be a failure", function() {

        });
      });
    });

    describe("when calling resetBoard()", function() {
      it("if gameIsValid(), then the board.newGame event is raised", function() {
        spyOn(amplify, "publish");
        spyOn(game, 'gameIsValid').andReturn(true); 
        game.resetBoard();
        expect(game.gameIsValid).toHaveBeenCalled();
        expect(amplify.publish).toHaveBeenCalledWith(events.board.newGame, game.columns(), game.rows(), game.numMines());
      });

      it("if !gameIsValid(), then the board.newGame event is not raised", function() {
        spyOn(amplify, "publish");
        spyOn(game, 'gameIsValid').andReturn(false); 
        game.resetBoard();
        expect(game.gameIsValid).toHaveBeenCalled();
        expect(amplify.publish).not.toHaveBeenCalledWith(events.board.newGame, game.columns(), game.rows(), game.numMines());
      });
    });

    describe('when cheating', function() {  
 
        it('if the game has not failed, showMines() will be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.cheat();

           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.showMines, true);
        });

        it('if the game has failed, showMines() will not be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.failure(true);
           game.cheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        }); 

        it('if the game has not succeeded, showMines() will be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.cheat();

           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.showMines, true);
        });

        it('if the game has succeeded, showMines() will not be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.success(true);
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

           game.failure(true);
           game.uncheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        });  
        
        it('if the game has not succeeded, hideMines() will be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.uncheat();

           console.log(events.tile.hideMines);
           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.hideMines);
        });

        it('if the game has succeeded, hideMines() will not be called on the Board.', function() {
           spyOn(global.amplify, "publish");

           game.success(true);
           game.uncheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        });  
    });
});