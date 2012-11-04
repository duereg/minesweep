(function(ko, amplify, undefined) {
	var define = require("./define.js");
	var events = require("./events.js");

	function tileViewModel(column, row, tile) {
		this.isCovered = ko.observable(tile && tile.isCovered); 
		this.isTagged = ko.observable(tile && tile.isTagged);
		this.column = column;
		this.row = row; 

		this.isBlank = ko.computed(function() {
			return this.isCovered() && !this.isTagged();
		}, this);
	};

	tileViewModel.prototype.uncover = function(raiseEvent) {
		if(this.isCovered()) { 
			this.isCovered(false);
			if(raiseEvent) {
				amplify.publish(events.tile.uncover, this.column, this.row, raiseEvent); 
			}
		} 
		
		if(this.isTagged()) {
			this.isTagged(false);
			amplify.publish(events.tile.tag, this);
		}
	};

	tileViewModel.prototype.click = function( ) { 
		this.uncover(true);
	};

	tileViewModel.prototype.tag = function() {
		if(this.isCovered()) {
			this.isTagged( !this.isTagged());
			amplify.publish(events.tile.tag, this);
		}
	};

	if(typeof window === 'undefined') {
		module.exports = tileViewModel;
	} else {
		define("tileViewModel", tileViewModel);
	}
})(ko, amplify);