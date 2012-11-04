describe('With a tileFactory', function() { 

    var column = 4;
    var row = 6;
    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 
    var tileFactory = null; 

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify; 
        
        tileFactory = require("../lib/tileFactory.js")
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe('and a tile where neither "isBorder" nor "isMine" is set to true', function() { 
        var tile;

        beforeEach(function() {
            tile = tileFactory(column, row, { isMine: false, isCovered: true, isBorder: false, value: 0});
        });

        it('value will be defined', function() {
            expect(tile.value).toBeDefined();
        });

        it('getValueColor will be defined', function() {
            expect(tile.getValueColor).toBeDefined();
        });

        it('isBlank will be defined', function() {
            expect(tile.isBlank).toBeDefined();
        });
    });
});