describe('When using the boardBuilder', function () {
  describe('to create tiles on a 10x10 Board', function () {
    var boardBuilder = require("../lib/boardBuilder.js");
    var tiles;

    beforeEach(function () {
      tiles = boardBuilder.createEmptyBoard(10, 10);
    });

    it('the Board will have 12 columns (10 columns + 2 borders)', function () {
      expect(tiles.length).toEqual(12);
    });

    it('the Board will have 12 rows (10 rows + 2 borders)', function () {
      expect(tiles[0].length).toEqual(12);
    });
  });
});
