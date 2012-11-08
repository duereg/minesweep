describe('With a MineViewModel', function() { 

    var TileViewModel;  
    var MineViewModel;

    var column = 4;
    var row = 6;

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 
    var events = require("../lib/events.js");

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify;
        TileViewModel = require("../lib/TileViewModel.js"); 
        MineViewModel = require("../lib/MineViewModel.js"); 
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });
 
    it("when destroy() is called, unsubscribe() is called for resize, destroy, exploded, showMines, hideMines, and disarm", function() {
        var tile = new MineViewModel(column, row);
        spyOn(amplify, 'unsubscribe');
        tile.destroy();

        expect(amplify.unsubscribe).toHaveBeenCalledWith(events.tile.resize, tile.size);
        expect(amplify.unsubscribe).toHaveBeenCalledWith(events.tile.destroy, tile.destroy); 
        expect(amplify.unsubscribe).toHaveBeenCalledWith(events.tile.exploded, tile.explode);
        expect(amplify.unsubscribe).toHaveBeenCalledWith(events.tile.showMines, tile.showMine); 
        expect(amplify.unsubscribe).toHaveBeenCalledWith(events.tile.hideMines, tile.hideMine);
        expect(amplify.unsubscribe).toHaveBeenCalledWith(events.tile.disarm, tile.disarm); 
    });
 

    describe('as a covered mine', function() { 
        var tile;

        beforeEach(function() {
            tile = new MineViewModel(column, row);
        });

        it('the explodedEvent will be defined', function() {
            expect(events.tile.exploded).toBeDefined();
        });

        it('when you click it, the explode event is raised', function() {
            spyOn(amplify, 'publish');
            tile.click();

            expect(amplify.publish).toHaveBeenCalledWith(events.tile.uncover, column, row, true);
            expect(amplify.publish).toHaveBeenCalledWith(events.tile.exploded, true);
        });

        it('when you tag it, the tag event is raised', function() {
            spyOn(amplify, 'publish');
            tile.tag();

            expect(amplify.publish).toHaveBeenCalledWith(events.tile.tag, tile);
        });
    });

    describe('as a covered and tagged mine', function() {
        var tile;

        beforeEach(function() {
            tile = new MineViewModel(column, row);
            tile.isTagged(true); 
        });

        it('when you uncover it, the mine will no longer be covered or tagged', function() {
            tile.uncover(true);

            expect(tile.isCovered()).toBe(false);
            expect(tile.isTagged()).toBe(false);
        });

        it('when you uncover it with raiseEvent = false, no events will be raised', function() {
            spyOn(amplify, "publish");

            tile.uncover(false);

            expect(amplify.publish).not.toHaveBeenCalledWith(events.tile.uncover, column, row, false); 
        });

        it('when you uncover it with raiseEvent = true, untag, uncover, and explode events will be raised', function() {
            spyOn(amplify, "publish");

            tile.uncover(true);

            expect(amplify.publish).toHaveBeenCalledWith(events.tile.uncover, column, row, true); 
            expect(amplify.publish).toHaveBeenCalledWith(events.tile.tag, tile); 
            expect(amplify.publish).toHaveBeenCalledWith(events.tile.exploded, true); 
        });

        it("you call showMine(true), taggedState will be set to true", function() {
            tile.showMine(true);

            expect(tile.isTagged()).toBe(false);
            expect(tile.taggedState).toBe(true);
        });

        it("you call showMine(true), the mine will no longer be tagged or covered", function() {
            tile.showMine(true);

            expect(tile.isTagged()).toBe(false);
            expect(tile.isCovered()).toBe(false);
        });

        it("you call showMine(false), the mine will no longer be tagged or covered", function() {
            tile.showMine(false);

            expect(tile.isTagged()).toBe(false);
            expect(tile.isCovered()).toBe(false);
        });

        it("you call showMine(true) then hideMine(), isTagged() will be set to true", function() {
            tile.showMine(true);
            tile.hideMine();

            expect(tile.isTagged()).toBe(true); 
        });

        it("you call showMine(false) then hideMine(), isTagged() will be set to false", function() {
            tile.showMine(false);
            tile.hideMine();

            expect(tile.isTagged()).toBe(false); 
        });
    });
});