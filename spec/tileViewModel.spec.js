describe('When you create a tileViewModel', function() { 

    var tileViewModel; 
    var column = 4;
    var row = 6;

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;
        tileViewModel = require("../lib/tileViewModel.js"); 
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });
 
    describe('as a Mine', function() { 
        var tile;

        beforeEach(function() {
            tile = new tileViewModel(column, row, { isMine: true, isCovered: true, isBorder: false, value: 0});
        });

        it('when you click it, the explode event is raised', function() {
            spyOn(amplify, 'publish');
            tile.click();

            expect(amplify.publish).toHaveBeenCalledWith(tileViewModel.uncoverEvent, column, row, true);
            expect(amplify.publish).toHaveBeenCalledWith(tileViewModel.explodedEvent, true);
        });

        it('when you tag it, the tag event is raised', function() {
            spyOn(amplify, 'publish');
            tile.tag();

            expect(amplify.publish).toHaveBeenCalledWith(tileViewModel.tagEvent, tile);
        });
    });

    describe('as a Covered Tile', function() { 
        var tile;

        beforeEach(function() {
            tile = new tileViewModel(column, row, { isMine: false, isCovered: true, isBorder: false, value: 0});
        });

        it('when you click it, the uncover event is raised', function() {
            spyOn(amplify, 'publish');
            tile.click();

            expect(amplify.publish).toHaveBeenCalledWith(tileViewModel.uncoverEvent, column, row, true); 
        });

        it('when you tag it, the tag event is raised', function() {
            spyOn(amplify, 'publish');
            tile.tag();

            expect(amplify.publish).toHaveBeenCalledWith(tileViewModel.tagEvent, tile);
        });
    }); 

    describe('as a covered and tagged tile', function() {
        var tile;

        beforeEach(function() {
            tile = new tileViewModel(column, row, { isMine: false, isCovered: true, isBorder: false, isTagged: true, value: 0}); 
        });

        it('when you uncover it, the tile will no longer be covered or tagged', function() {
            tile.uncover(true);

            expect(tile.isCovered()).toBe(false);
            expect(tile.isTagged()).toBe(false);
        });

        it('when you uncover it with raiseEvent = false, no events will be raised', function() {
            spyOn(amplify, "publish");

            tile.uncover(false);

            expect(amplify.publish).not.toHaveBeenCalledWith(tileViewModel.uncoverEvent, column, row, false); 
        });

        it('when you uncover it with raiseEvent = true, untag and uncover events will be raised', function() {
            spyOn(amplify, "publish");

            tile.uncover(true);

            expect(amplify.publish).toHaveBeenCalledWith(tileViewModel.uncoverEvent, column, row, true); 
            expect(amplify.publish).toHaveBeenCalledWith(tileViewModel.tagEvent, tile); 
        });
    })

    describe('as a blank tile', function() { 
        var tile;

        beforeEach(function() {
            tile = new tileViewModel(column, row, { isMine: false, isCovered: false, isBorder: false, value: 0});
        });

        it('when you click it, no events are raised', function() {
            spyOn(amplify, 'publish');
            tile.click();

            expect(amplify.publish).not.toHaveBeenCalled(); 
        });

        it('when you tag it, no tag is raised', function() {
            spyOn(amplify, 'publish');
            tile.tag();

            expect(amplify.publish).not.toHaveBeenCalled(); 
        });

        it('when you uncover it, no events are raised', function() {
            spyOn(amplify, 'publish');
            tile.uncover(true);

            expect(amplify.publish).not.toHaveBeenCalled(); 
        });
    }); 
});