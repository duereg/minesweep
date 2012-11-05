describe('With a ValueViewModel', function() { 

    var TileViewModel; 
    var ValueViewModel; 

    var column = 4;
    var row = 6;

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 
    var events = require("../lib/events.js");

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;
        TileViewModel = require("../lib/TileViewModel.js");  
        ValueViewModel = require("../lib/ValueViewModel.js"); 
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });
 
    describe('as a covered value', function() { 
        var tile;

        beforeEach(function() {
            tile = new ValueViewModel(column, row, { isMine: false, isCovered: true, isBorder: false, value: 0});
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

    describe('as a covered and tagged value', function() {
        var tile;

        beforeEach(function() {
            tile = new ValueViewModel(column, row, { isMine: false, isCovered: true, isBorder: false, isTagged: true, value: 0}); 
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