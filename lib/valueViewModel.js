/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function(ko, amplify, undefined) {
	'use strict';

	var define = require("./define.js");
	var colors = ["silver", "blue", "green", "red", "purple", "yellow", "brown", "black", "orange" ]; 
	var TileViewModel = require("./TileViewModel.js"); 
	
    /*jshint validthis: true */
	function ValueViewModel(column, row, tile) {
		TileViewModel.apply(this, arguments); 
		this.value = ko.observable(tile && tile.value);

		this.getValueColor = ko.computed(function() {
			return colors[this.value()];
		}, this);

		this.isValue = ko.computed(function() {
			return !this.isCovered() && !this.isTagged();
		}, this); 
	}

	ValueViewModel.prototype = new TileViewModel();
	ValueViewModel.prototype.constructor = ValueViewModel;

	if(typeof window === 'undefined') {
		module.exports = ValueViewModel;
	} else {
		define("ValueViewModel", ValueViewModel);
	}
})(ko, amplify);