describe('When using the builder', function() {

    describe('and calling newGame() on a 10x10 Board', function() {
        var Board = require("../lib/Board.js");
        var builder = require("../lib/builder.js");
        var newBoard = new Board(10, 10, 10); 
        
        beforeEach(function() {
            builder.newGame(newBoard);
        });

        it('the Board will contain 10 mines', function() {
            var mineCount = 0;

            while(newBoard.tiles.length > 0) {
                var row = newBoard.tiles.pop();
                while(row.length > 0) {
                    var tile = row.pop();
                    if(tile.isMine){
                        mineCount++;
                    }
                }
            }

            expect(mineCount).toEqual(10);
        }); 
    });
});