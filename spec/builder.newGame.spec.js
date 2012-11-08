describe('After calling newGame() on the builder', function () {

    var builder = require("../lib/builder.js");
    var tileBuilder = require("./fake.tileBuilder.js");

    describe('for a board with 10 Mines', function () { 
        var tiles;
        var config = { columns: 10, rows: 10, numMines: 10 }; 

        it('ten mines will be present', function () {
            var tiles = builder.newGame(config, tileBuilder);
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