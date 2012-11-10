describe('After calling newGame() on the boardBuilder', function () {

    var boardBuilder = require("../lib/boardBuilder.js");
    var tileFactory = require("./fake.tileFactory.js");

    describe('for a board with 10 Mines', function () { 
        var tiles;
        var config = { columns: 10, rows: 10, numMines: 10 }; 

        it('ten mines will be present', function () {
            var tiles = boardBuilder.newGame(config, tileFactory);
            var numMines = 0;

            for(var i = 0; i < tiles.length; i++) {
                for(var j = 0; j < tiles[i].length; j++) {
                    var tile = tiles[i][j];
                    if(tile && tile.isMine) {
                        numMines++;
                    }
                }
            }

            expect(numMines).toEqual(10);
            
        });
    }); 
});