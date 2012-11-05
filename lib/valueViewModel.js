/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function(ko, amplify, undefined) {
	'use strict';

	var define = require("./define.js");
	var TileViewModel = require("./tileViewModel.js"); 
	var colors = ["silver", "blue", "green", "red", "purple", "yellow", "brown", "black", "orange" ]; 
	
    /*jshint validthis: true */
	function valueViewModel(column, row, tile) {
		TileViewModel.apply(this, arguments); 
		this.value = ko.observable(tile && tile.value);

		this.getValueColor = ko.computed(function() {
			return colors[this.value()];
		}, this);

		this.isValue = ko.computed(function() {
			return !this.isCovered() && !this.isTagged();
		}, this); 
	}

	valueViewModel.prototype = new TileViewModel();
	valueViewModel.prototype.constructor = valueViewModel;

	if(typeof window === 'undefined') {
		module.exports = valueViewModel;
	} else {
		define("valueViewModel", valueViewModel);
	}
})(ko, amplify);