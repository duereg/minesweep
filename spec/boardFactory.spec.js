describe('When creating a board from the boardFactory', function() {

    var ko = require("./fake.ko.js");
    var amplify = require("./fake.amplify.js"); 
    var boardFactory;

    beforeEach(function() {
        global.ko = ko;
        global.amplify = amplify; 
        boardFactory = require("../lib/boardFactory.js");
    });

    afterEach(function() {
        delete global.ko;
        delete global.amplify;
    });

	it('tiles will be defined', function() {
		var board = boardFactory(10, 10, 10);

		expect(board).not.toEqual(undefined);
	});

    it('tiles will be a 12x12 array (10x10 + borders)', function() {
        var board = boardFactory(10, 10, 10);

        expect(board.length).toEqual(12);
        expect(board[0].length).toEqual(12);
    });

    it('if column is not a number, an error will occur', function() {
        expect(function() { boardFactory("foo", 10, 10); }).toThrow();
    });

    it('if row is not a number, an error will occur', function() {
        expect(function() { boardFactory(10, "foo",  10); }).toThrow();
    });

    it('if the number of mines is not a number, an error will occur', function() {
        expect(function() { boardFactory( 10, 10, "foo"); }).toThrow();
    });
});