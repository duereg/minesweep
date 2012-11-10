module.exports = {
	createMine: function (column, row) { return { isMine: true }; },
	createBorder: function (column, row) { return { isBorder: true }; },
	createTile: function(column, row) { return { value: 0 }; },

	isMine: function(tile) { return tile && tile.isMine; },
	isBorder: function(tile) { return tile && tile.isBorder; },
	incrementValue: function(tile) { tile.value = tile.value + 1; }
};