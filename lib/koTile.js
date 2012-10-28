(function(ko, undefined) {
	var define = require("./define.js");
	var colors = ["silver", "blue", "green", "red", "purple", "yellow", "brown", "black", "orange" ]; 

	var koTile = function(column, row, tile, boardClick) {
		this.value = ko.observable(tile.value);
		this.isMine = ko.observable(tile.isMine);
		this.isCovered = ko.observable(tile.isCovered);
		this.isBorder = ko.observable(tile.isBorder);
		this.isTagged = ko.observable(false);

		this.click = function( ) { 
			if( !!!boardClick) throw("no board click method defined.");
			boardClick(column, row);
		};

		this.tag = function() {
			if(this.isCovered()) {
				this.isTagged( !this.isTagged());
			}
		}.bind(this);

		this.getValueColor = ko.computed(function() {
			return colors[this.value()];
		}, this);

		this.isBlank = ko.computed(function() {
			return !this.isBorder() && this.isCovered() && !this.isTagged();
		}, this);

		this.showValue = ko.computed(function() {
			return !this.isMine() && !this.isBorder() && !this.isCovered();
		}, this);

		this.showMine = ko.computed(function() {
			return this.isMine() && !this.isCovered();
		}, this);
	};
 
	if(typeof window === 'undefined') {
		module.exports = koTile;
	} else {
		define("koTile", koTile);
	}
})(ko, undefined);