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
            spyOn(global.amplify, 'publish');
            tile.click();

            expect(global.amplify.publish).toHaveBeenCalledWith(tileViewModel.uncoverEvent, column, row, true);
            expect(global.amplify.publish).toHaveBeenCalledWith(tileViewModel.explodedEvent, true);
        });

        it('when you tag it, the tag event is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.tag();

            expect(global.amplify.publish).toHaveBeenCalledWith(tileViewModel.tagEvent, column, row);
        });
    });

    describe('as a Covered Tile', function() { 
        var tile;

        beforeEach(function() {
            tile = new tileViewModel(column, row, { isMine: false, isCovered: true, isBorder: false, value: 0});
        });

        it('when you click it, the uncover event is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.click();

            expect(global.amplify.publish).toHaveBeenCalledWith(tileViewModel.uncoverEvent, column, row, true); 
        });

        it('when you tag it, the tag event is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.tag();

            expect(global.amplify.publish).toHaveBeenCalledWith(tileViewModel.tagEvent, column, row);
        });
    }); 

    describe('as a blank tile', function() { 
        var tile;

        beforeEach(function() {
            tile = new tileViewModel(column, row, { isMine: false, isCovered: false, isBorder: false, value: 0});
        });

        it('when you click it, no event is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.click();

            expect(global.amplify.publish).not.toHaveBeenCalledWith(); 
        });

        it('when you tag it, no tag is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.tag();

            expect(global.amplify.publish).not.toHaveBeenCalledWith(); 
        });
    }); 
});