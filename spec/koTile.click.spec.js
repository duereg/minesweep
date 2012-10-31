describe('When you create a koTile', function() { 
    global.ko = { 
        observable: function(value) { return function() {return value;}},
        observableArray: function(value) {return function() {return value;}},
        computed: function(value) {return function() {return value;}} 
    };

    global.amplify = {
        subscribe: function() {},
        publish: function() {}
    };
 
    var koTile = require("../lib/koTile.js"); 
    var column = 4;
    var row = 6;

    describe('as a Mine', function() { 
        var tile;

        beforeEach(function() {
            tile = new koTile(column, row, { isMine: true, isCovered: true, isBorder: false, value: 0});
        });

        it('when you click it, the explode event is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.click();

            expect(global.amplify.publish).toHaveBeenCalledWith(koTile.uncoverEvent, column, row, true);
            expect(global.amplify.publish).toHaveBeenCalledWith(koTile.explodedEvent, true);
        });

        it('when you tag it, the tag event is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.tag();

            expect(global.amplify.publish).toHaveBeenCalledWith(koTile.tagEvent, column, row);
        });
    });

    describe('as a Covered Tile', function() { 
        var tile;

        beforeEach(function() {
            tile = new koTile(column, row, { isMine: false, isCovered: true, isBorder: false, value: 0});
        });

        it('when you click it, the uncover event is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.click();

            expect(global.amplify.publish).toHaveBeenCalledWith(koTile.uncoverEvent, column, row, true); 
        });

        it('when you tag it, the tag event is raised', function() {
            spyOn(global.amplify, 'publish');
            tile.tag();

            expect(global.amplify.publish).toHaveBeenCalledWith(koTile.tagEvent, column, row);
        });
    }); 

    describe('as a blank tile', function() { 
        var tile;

        beforeEach(function() {
            tile = new koTile(column, row, { isMine: false, isCovered: false, isBorder: false, value: 0});
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