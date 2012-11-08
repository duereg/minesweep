describe('With a TileViewModel', function() { 

    var TileViewModel;  

    var column = 4;
    var row = 6;

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 
    var events = require("../lib/events.js");  

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;
        TileViewModel = require("../lib/tileViewModel.js");  
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

    it("when destroy() is called, unsubscribe() is called for resize and destroy", function() {
        var tile = new TileViewModel(column, row);
        spyOn(amplify, 'unsubscribe');
        tile.destroy();

        expect(amplify.unsubscribe).toHaveBeenCalledWith(events.tile.resize, tile.size);
        expect(amplify.unsubscribe).toHaveBeenCalledWith(events.tile.destroy, tile.destroy); 
    });
 
    describe('as a covered tile', function() { 
        var tile;

        beforeEach(function() {
            tile = new TileViewModel(column, row);
        });

        it('when you click it, the uncover event is raised', function() {
            spyOn(amplify, 'publish');
            tile.click();

            expect(amplify.publish).toHaveBeenCalledWith(events.tile.uncover, column, row, true); 
        });

        it('when you tag it, the tag event is raised', function() {
            spyOn(amplify, 'publish');
            tile.tag();

            expect(amplify.publish).toHaveBeenCalledWith(events.tile.tag, tile);
        });
    }); 

    describe('as a covered and tagged tile', function() {
        var tile;

        beforeEach(function() {
            tile = new TileViewModel(column, row); 
            tile.isTagged(true);
        });

        it('when you uncover it, the tile will no longer be covered or tagged', function() {
            tile.uncover(true);

            expect(tile.isCovered()).toBe(false);
            expect(tile.isTagged()).toBe(false);
        });

        it('when you uncover it with raiseEvent = false, no events will be raised', function() {
            spyOn(amplify, "publish");

            tile.uncover(false);

            expect(amplify.publish).not.toHaveBeenCalledWith(events.tile.uncover, column, row, false); 
        });

        it('when you uncover it with raiseEvent = true, untag and uncover events will be raised', function() {
            spyOn(amplify, "publish");

            tile.uncover(true);

            expect(amplify.publish).toHaveBeenCalledWith(events.tile.uncover, column, row, true); 
            expect(amplify.publish).toHaveBeenCalledWith(events.tile.tag, tile); 
        });
    });
});