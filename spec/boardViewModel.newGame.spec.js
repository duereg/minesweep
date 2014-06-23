describe('With a BoardViewModel', function () {
  var ko = require("./fake.ko.js");
  var amplify = require("./fake.amplify.js");
  var events = require("../lib/events.js");

  var boardFactory = null;
  var boardVm = null;

  beforeEach(function () {
    global.ko = ko;
    global.amplify = amplify;
    boardFactory = require("../lib/boardFactory.js");
    var BoardViewModel = require("../lib/BoardViewModel.js");
    boardVm = new BoardViewModel();
  });

  afterEach(function () {
    delete global.ko;
    delete global.amplify;
  });

  describe('when starting a new game', function () {
    describe("with a 16x16 board with 10 mines", function () {
      var config = {
        columns: 16,
        rows: 16,
        numMines: 10,
        maxRows: 32,
        maxColumns: 32
      };

      it("the tile.destroy & tile.resize events will be raised", function () {
        spyOn(amplify, "publish");
        boardVm.newGame(config);
        expect(amplify.publish).toHaveBeenCalledWith(events.tile.destroy);
      });

      it("the tile.resize event will be raised, with tile size 32", function () {
        spyOn(amplify, "publish");
        boardVm.newGame(config);
        expect(amplify.publish).toHaveBeenCalledWith(events.tile.resize, 32);
      });
    });

    describe("with a 10x10 board with 10 mines", function () {
      var config = {
        columns: 10,
        rows: 10,
        numMines: 10,
        maxRows: 32,
        maxColumns: 32
      };

      it('10 mines positions will be recorded.', function () {
        boardVm.newGame(config);
        expect(boardVm.minePositions.length).toEqual(10);
      });

      it('a 12x12 tile array will be created.', function () {
        boardVm.newGame(config);
        expect(boardVm.tiles().length).toEqual(12);
        expect(boardVm.tiles()[0].length).toEqual(12);
      });
    });

    describe("with a 1x1 board with 1 mine", function () {
      var config = {
        columns: 1,
        rows: 1,
        numMines: 1,
        maxRows: 32,
        maxColumns: 32
      };

      it('1 mine position will be recorded.', function () {
        boardVm.newGame(config);
        expect(boardVm.minePositions.length).toEqual(1);
      });

      it('a 3x3 tile array will be created.', function () {
        boardVm.newGame(config);
        expect(boardVm.tiles().length).toEqual(3);
        expect(boardVm.tiles()[0].length).toEqual(3);
      });

      it("when checking allMinesAreTagged, the board.allMinesAreTagged event is raised", function () {
        spyOn(amplify, "publish");
        boardVm.allMinesAreTagged(false);
        expect(amplify.publish).toHaveBeenCalledWith(events.board.allMinesTagged, false);
      });
    });

    it('with a board of size 16x16 with 50 mines, 50 mines positions will be recorded.', function () {
      var config = {
        columns: 50,
        rows: 50,
        numMines: 50,
        maxRows: 32,
        maxColumns: 32
      };

      boardVm.newGame(config);
      expect(boardVm.minePositions.length).toEqual(50);
    });
  });
});
