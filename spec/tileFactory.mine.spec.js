describe('With a tileFactory', function() { 

    var column = 4;
    var row = 6;
    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 
    var tileFactory = null; 

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify; 
        
        tileFactory = require("../lib/tileFactory.js");
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    describe('and a tile where "isMine" is set to true', function() { 
        var tile;

        beforeEach(function() {
            tile = tileFactory.createMine(1, 1);
        });

        it('uncover will be defined', function() {
            expect(tile.uncover).toBeDefined();
        });

        it('showMine will be defined', function() {
            expect(tile.showMine).toBeDefined();
        });

        it('hideMine will be defined', function() {
            expect(tile.hideMine).toBeDefined();
        });

        it('disarm will be defined', function() {
            expect(tile.disarm).toBeDefined();
        });

        it('taggedState will be defined', function() {
            expect(tile.taggedState).toBeDefined();
        });

        it('armed will be defined', function() {
            expect(tile.armed).toBeDefined();
        });
    });
});