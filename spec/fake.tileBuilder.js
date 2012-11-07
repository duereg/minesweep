module.exports = {
	function createMine(column, row) { 
		return { isMine: true };
	};
	function createBorder(column, row) { 
		return { isBorder: true };
	};
	function createTile(column, row) { 
		return { value: 0 };
	};

	function isMine(tile) { return tile && tile.isMine; };
	function isBorder(tile) { return tile && tile.isBorder; };
	function incrementValue(tile) { tile.value = tile.value + 1; };
};