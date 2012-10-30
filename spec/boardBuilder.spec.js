var boardBuilder = require("../lib/boardBuilder.js");

describe('When creating a board from the boardBuilder', function() {

	it('tiles will be defined', function() {
		var board = boardBuilder(10, 10, 10);

		expect(board.tiles).toBeDefined();
	});

    it('tiles will be a 12x12 array (10x10 + borders)', function() {
        var board = boardBuilder(10, 10, 10);

        expect(board.tiles.length).toEqual(12);
        expect(board.tiles[0].length).toEqual(12);
    });

    it('columns will be defined', function() {
        var board = boardBuilder(10, 10, 10);

        expect(board.columns).toBeDefined();
    });

    it('columns will Equal 10', function() {
        var board = boardBuilder(10, 10, 10);

        expect(board.columns).toEqual(10);
    });

    it('rows will be defined', function() {
        var board = boardBuilder(10, 10, 10);

        expect(board.rows).toBeDefined();
    });

    it('rows will Equal 10', function() {
        var board = boardBuilder(10, 10, 10);

        expect(board.rows).toEqual(10);
    });
    
    it('numMines will be defined', function() {
        var board = boardBuilder(10, 10, 10);

        expect(board.numMines).toBeDefined();
    });

    it('numMines will Equal 10', function() {
        var board = boardBuilder(10, 10, 10);

        expect(board.numMines).toEqual(10);
    });

	it('newGame will not be defined', function() {
		var board = boardBuilder(10, 10, 10);

		expect(board.newGame).not.toBeDefined();
	}); 
});