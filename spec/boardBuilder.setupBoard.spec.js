describe('After calling addTilesToBoard() on the boardBuilder', function () {
  var boardBuilder = require("../lib/boardBuilder.js");
  var tileFactory = require("./fake.tileFactory.js");

  describe('on a 10x10 Board', function () {
    var tiles;

    beforeEach(function () {
      tiles = boardBuilder.createEmptyBoard(10, 10);
      boardBuilder.addTilesToBoard(tiles, tileFactory);
    });

    describe('the borders will be', function () {
      it('the 1st row', function () {
        for (var row = 0; row < tiles.length; row++) {
          expect(tiles[row][0].isBorder).toBe(true);
        }
      });

      it('the last row', function () {
        for (var row = 0; row < tiles.length; row++) {
          expect(tiles[row][11].isBorder).toBe(true);
        }
      });

      it('the 1st column', function () {
        for (var column = 0; column < tiles[0].length; column++) {
          expect(tiles[0][column].isBorder).toBe(true);
        }
      });

      it('the last column', function () {
        for (var column = 0; column < tiles[11].length; column++) {
          expect(tiles[11][column].isBorder).toBe(true);
        }
      });
    });
  });
});
