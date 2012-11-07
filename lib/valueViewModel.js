/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function(ko, amplify, undefined) {
	'use strict';

	var define = require("./define.js");
	var colors = ["silver", "blue", "green", "red", "purple", "yellow", "brown", "black", "orange" ]; 
	var TileViewModel = require("./TileViewModel.js"); 
	
    /*jshint validthis: true */
	function ValueViewModel(column, row) {
		TileViewModel.apply(this, arguments); 
		this.value = ko.observable(0);

		this.getValueColor = ko.computed(function() {
			return colors[this.value()];
		}, this);

		this.isValue = ko.computed(function() {
			return !this.isCovered() && !this.isTagged();
		}, this); 

		this.sizeInPixels = ko.computed(function() {
			if(this.isCovered() || this.isTagged())
				return this.size() + "px";
			else 
				return this.size() - 2 + "px";
		}, this);

		this.fontSizeInPixels = ko.computed(function() {
			return this.size() - 4 + "px";
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