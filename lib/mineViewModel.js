(function(ko, amplify, undefined) {
	var define = require("./define.js");
	var tileViewModel = require("./tileViewModel.js");
	var events = require("./events.js");
	
	function mineViewModel(column, row, tile) {
		tileViewModel.apply(this, arguments);

		this.taggedState = false;
		this.armed = ko.observable(true); 

		this.isMine = ko.computed(function() {
			return !this.isCovered() && !this.isTagged();
		}, this); 

		this.uncover = function(raiseEvent) {
			tileViewModel.prototype.uncover.call(this, raiseEvent);

			if(raiseEvent) { 
				amplify.publish(events.tile.exploded, true); 
			} 
		}.bind(this);

		this.showMine = function(recordState) {  
			if(recordState) {
				this.taggedState = this.isTagged();
			}
			this.uncover(false); 
		}.bind(this);

		this.hideMine = function () {	 
			this.isTagged(this.taggedState);
			this.isCovered(true); 
		}.bind(this);

		this.disarm = function () {	 
			this.armed(false); 
		}.bind(this);

		amplify.subscribe(events.tile.exploded, this, function() { this.uncover(false); }.bind(this));
		amplify.subscribe(events.tile.showMines, this, this.showMine);
		amplify.subscribe(events.tile.hideMines, this, this.hideMine);
		amplify.subscribe(events.tile.disarm, this, this.disarm);
	};

	mineViewModel.prototype = new tileViewModel();
	mineViewModel.prototype.constructor = mineViewModel;

	if(typeof window === 'undefined') {
		module.exports = mineViewModel;
	} else {
		define("mineViewModel", mineViewModel);
	}
})(ko, amplify);
