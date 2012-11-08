describe('When creating a board from the boardBuilder', function() {

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 
    var boardBuilder;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify; 
        boardBuilder = require("../lib/boardBuilder.js");
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

	it('tiles will be defined', function() {
		var board = boardBuilder(10, 10, 10);

		expect(board).not.toEqual(undefined);
	});

    it('tiles will be a 12x12 array (10x10 + borders)', function() {
        var board = boardBuilder(10, 10, 10);

        expect(board.length).toEqual(12);
        expect(board[0].length).toEqual(12);
    });

    it('if column is not a number, an error will occur', function() {
        expect(function() { boardBuilder("foo", 10, 10); }).toThrow();
    });

    it('if row is not a number, an error will occur', function() {
        expect(function() { boardBuilder(10, "foo",  10); }).toThrow();
    });

    it('if the number of mines is not a number, an error will occur', function() {
        expect(function() { boardBuilder( 10, 10, "foo"); }).toThrow();
    });
});