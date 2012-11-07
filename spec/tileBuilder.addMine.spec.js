describe('After calling addMine() on a 10x10 Board', function () {

    var tiles;
    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 
    var builder = require("../lib/builder.js");
    var tileBuilder;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify; 

        tileBuilder = require("../lib/tileBuilder.js");
        tiles = builder.createEmptyBoard(10, 10);
        builder.addTilesToBoard(tiles); //Setup Board but do not add mines
        tiles[5][5] = tileBuilder.createMine(5, 5);
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    it('the call will set the tile to IsMine === true', function() { 
        expect(newBoard.tiles[5][5].isMine).toBeDefined();
    });

    it('the call will not increment the value of the Mine', function() { 
        checkTileValue(5, 5, 0);
    });

    it('the neighboring mines will have their count incremented by 1.', function() { 
        checkTileValue(4, 5, 1);
        checkTileValue(6, 5, 1);
        checkTileValue(5, 4, 1);
        checkTileValue(5, 6, 1);
        checkTileValue(4, 6, 1);
        checkTileValue(6, 6, 1);
        checkTileValue(6, 4, 1);
        checkTileValue(4, 4, 1);
    });

    describe('When adding a 2nd mine next to the original on the same row', function () {
        beforeEach(function() {
            builder.addMine(newBoard, 4, 5);
        });

        it('the tiles in the rows directly above and below the two mines will have a value of 2', function() { 
            checkTileValue(5, 6, 2);
            checkTileValue(5, 4, 2); 
            checkTileValue(4, 6, 2);
            checkTileValue(4, 4, 2);
        });

        it('the tiles adjoining the mines in the same row will have a value of 1', function() { 
            checkTileValue(6, 5, 1);
            checkTileValue(4, 5, 1);
        });
    });

    function checkTileValue(column, row, value) {
        if(!newBoard.tiles[column][row].isBorder && !newBoard.tiles[column][row].isMine) {
            expect(newBoard.tiles[column][row].value()).toBe(value);
        }
    };
}); 