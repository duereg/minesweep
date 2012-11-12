describe('With a GameViewModel', function() { 

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js");
    var events = require("../lib/events.js");
    var boardBuilder = require("../lib/boardBuilder.js"); 
    var config = {columns: 8, rows: 8, numMines: 10, maxColumns: 32, maxRows: 32};
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
        spyOn(game, "canValidate").andReturn(false);
        spyOn(amplify, "publish");
        game.validateGame();
        expect(game.canValidate).toHaveBeenCalled();
        expect(amplify.publish).not.toHaveBeenCalled();
      });

      describe("if canValidate() is true", function() {
        it("if all tiles have been uncovered but mines, the game will be a success", function() {
          spyOn(game, "canValidate").andReturn(true);
          spyOn(game, "allTagsUsed").andReturn(false);
          spyOn(game, "success");
          spyOn(game, "failure"); 
          
          game.validateGame();

          expect(game.canValidate).toHaveBeenCalled();
          expect(game.allTagsUsed).toHaveBeenCalled();
          expect(game.success).toHaveBeenCalledWith(true);
          expect(game.failure).toHaveBeenCalledWith(false);
        });

        it("if all the mines have been tagged, but not all the tiles have been uncovered, the game will be a success", function() {
          spyOn(game, "canValidate").andReturn(true);
          spyOn(game, "allTagsUsed").andReturn(true);

          spyOn(game, "minesTagged").andReturn(10);
          spyOn(game, "tilesCovered").andReturn(64);
          spyOn(game, "allMinesTagged").andReturn(true);

          spyOn(game, "success");
          spyOn(game, "failure"); 
          
          game.validateGame();

          expect(game.canValidate).toHaveBeenCalled();
          expect(game.allTagsUsed).toHaveBeenCalled();
          expect(game.minesTagged).toHaveBeenCalled();
          expect(game.tilesCovered).toHaveBeenCalled();
          expect(game.allMinesTagged).toHaveBeenCalled();
          expect(game.success).toHaveBeenCalledWith(true);
          expect(game.failure).toHaveBeenCalledWith(false);
        });

        it("if tiles were incorrectly tagged as mines, the game will be a failure", function() {
          spyOn(game, "canValidate").andReturn(true);
          spyOn(game, "allTagsUsed").andReturn(true);

          spyOn(game, "minesTagged").andReturn(10);
          spyOn(game, "tilesCovered").andReturn(64);
          spyOn(game, "allMinesTagged").andReturn(false);

          spyOn(game, "success");
          spyOn(game, "failure"); 
          
          game.validateGame();

          expect(game.canValidate).toHaveBeenCalled();
          expect(game.allTagsUsed).toHaveBeenCalled();
          expect(game.minesTagged).toHaveBeenCalled();
          expect(game.tilesCovered).toHaveBeenCalled();
          expect(game.allMinesTagged).toHaveBeenCalled();
          expect(game.success).toHaveBeenCalledWith(false);
          expect(game.failure).toHaveBeenCalledWith(true);
        });
      });
    });

    describe("when calling newGame()", function() {
      it("if gameIsValid(), then the board.newGame event is raised", function() {
        spyOn(amplify, "publish");
        spyOn(game, 'gameIsValid').andReturn(true); 
        game.newGame();
        expect(game.gameIsValid).toHaveBeenCalled();
        expect(amplify.publish).toHaveBeenCalledWith(events.board.newGame, config);
      });

      it("if !gameIsValid(), then the board.newGame event is not raised", function() {
        spyOn(amplify, "publish");
        spyOn(game, 'gameIsValid').andReturn(false); 
        game.newGame();
        expect(game.gameIsValid).toHaveBeenCalled();
        expect(amplify.publish).not.toHaveBeenCalledWith(events.board.newGame, config);
      });
    });

    describe('when cheating', function() {  
 
        it('if the game is not over, showMines() will be called on the Board.', function() {
           spyOn(global.amplify, "publish");
           spyOn(game, "gameOver").andReturn(false);

           game.cheat();

           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.showMines, true);
        });

        it('if the game is over, showMines() will not be called on the Board.', function() {
           spyOn(global.amplify, "publish");
           spyOn(game, "gameOver").andReturn(true);

           game.failure(true);
           game.cheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        }); 
    });

    describe('when uncheating', function() {  

        it('if the game is not over, hideMines() will be called on the Board.', function() {
           spyOn(global.amplify, "publish");
           spyOn(game, "gameOver").andReturn(false);

           game.uncheat();

           expect(global.amplify.publish).toHaveBeenCalledWith(events.tile.hideMines);
        });

        it('if the game is over, hideMines() will not be called on the Board.', function() {
           spyOn(global.amplify, "publish");
           spyOn(game, "gameOver").andReturn(true);

           game.failure(true);
           game.uncheat();

           expect(global.amplify.publish).not.toHaveBeenCalled();
        });  
    });
});