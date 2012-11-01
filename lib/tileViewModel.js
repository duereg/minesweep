(function(ko, amplify, undefined) {
	var define = require("./define.js");
	var colors = ["silver", "blue", "green", "red", "purple", "yellow", "brown", "black", "orange" ]; 

	var explodedEvent = "tile.exploded";
	var uncoverEvent = "tile.uncover";
	var tagEvent = "tile.tagged"; 

	var tileViewModel = function(column, row, tile) {
		var me = this;

		this.value = ko.observable(tile.value);
		this.isMine = ko.observable(tile.isMine);
		this.isCovered = ko.observable(tile.isCovered);
		this.isBorder = ko.observable(tile.isBorder);
		this.isTagged = ko.observable(false);

		this.click = function( ) { 
			if(me.isTagged()) {
				me.isTagged(false);
				amplify.publish(tagEvent, me);
			}

			if(me.isCovered()) { 
				me.isCovered(false);
				amplify.publish(uncoverEvent, column, row, true); 
			} 
			
			if(me.isMine()) { 
				amplify.publish(explodedEvent, true); 
			} 
		};

		this.tag = function() {
			if(me.isCovered()) {
				me.isTagged( !me.isTagged());
				amplify.publish(tagEvent, me);
			}
		};

		this.getValueColor = ko.computed(function() {
			return colors[me.value()];
		});

		this.isBlank = ko.computed(function() {
			return !me.isBorder() && me.isCovered() && !me.isTagged();
		});

		this.showValue = ko.computed(function() {
			return !me.isMine() && !me.isBorder() && !me.isCovered();
		});

		this.showMine = ko.computed(function() {
			return me.isMine() && !me.isCovered();
		});
	};

	tileViewModel.explodedEvent = explodedEvent;
	tileViewModel.uncoverEvent = uncoverEvent;
	tileViewModel.tagEvent = tagEvent; 
 
	if(typeof window === 'undefined') {
		module.exports = tileViewModel;
	} else {
		define("tileViewModel", tileViewModel);
	}
})(ko, amplify);