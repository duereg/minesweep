describe('After calling tileFactory.createMine() on a 10x10 Board', function () {
  var tiles;
  var ko = require("./fake.ko.js");
  var amplify = require("./fake.amplify.js");
  var boardBuilder = require("../lib/boardBuilder.js");
  var tileFactory;

  beforeEach(function () {
    global.ko = ko;
    global.amplify = amplify;

    tileFactory = require("../lib/tileFactory.js");
    tiles = boardBuilder.createEmptyBoard(10, 10);
    boardBuilder.addTilesToBoard(tiles, tileFactory); //Setup Board but do not add mines
    boardBuilder.addMine(tiles, tileFactory, {
      column: 5,
      row: 5
    });
  });

  afterEach(function () {
    delete global.ko;
    delete global.amplify;
  });

  it('the call will set the tile to IsMine', function () {
    expect(tiles[5][5].isMine).toBeDefined();
  });

  it('the call will not increment the value of the Mine', function () {
    checkTileValue(5, 5, 0);
  });

  it('the neighboring mines will have their count incremented by 1.', function () {
    checkTileValue(4, 5, 1);
    checkTileValue(6, 5, 1);
    checkTileValue(5, 4, 1);
    checkTileValue(5, 6, 1);
    checkTileValue(4, 6, 1);
    checkTileValue(6, 6, 1);
    checkTileValue(6, 4, 1);
    checkTileValue(4, 4, 1);
  });

  it('the tileFactory will identity the tile as a Mine', function () {
    expect(tileFactory.isMine(tiles[5][5])).toBe(true);
  });

  describe('When adding a 2nd mine next to the original on the same row', function () {
    beforeEach(function () {
      boardBuilder.addMine(tiles, tileFactory, {
        column: 4,
        row: 5
      });
    });

    it('the tiles in the rows directly above and below the two mines will have a value of 2', function () {
      checkTileValue(5, 6, 2);
      checkTileValue(5, 4, 2);
      checkTileValue(4, 6, 2);
      checkTileValue(4, 4, 2);
    });

    it('the tiles adjoining the mines in the same row will have a value of 1', function () {
      checkTileValue(6, 5, 1);
      checkTileValue(4, 5, 1);
    });
  });

  function checkTileValue(column, row, value) {
    var tile = tiles[row][column];
    if (!tileFactory.isBorder(tile) && !tileFactory.isMine(tile)) {
      expect(tiles[row][column].value()).toBe(value);
    }
  }
});
