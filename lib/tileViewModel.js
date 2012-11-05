/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function(ko, amplify, undefined) {
	'use strict';

	var define = require("./define.js");
	var events = require("./events.js");

    /*jshint validthis: true */
	function TileViewModel(column, row, tile) {
		this.isCovered = ko.observable(tile && tile.isCovered); 
		this.isTagged = ko.observable(tile && tile.isTagged);
		this.column = column;
		this.row = row; 

		this.isBlank = ko.computed(function() {
			return this.isCovered() && !this.isTagged();
		}, this);
	}

	TileViewModel.prototype.uncover = function(raiseEvent) {
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

	TileViewModel.prototype.click = function( ) { 
		this.uncover(true);
	};

	TileViewModel.prototype.tag = function() {
		if(this.isCovered()) {
			this.isTagged( !this.isTagged());
			amplify.publish(events.tile.tag, this);
		}
	};

	if(typeof window === 'undefined') {
		module.exports = TileViewModel;
	} else {
		define("TileViewModel", TileViewModel);
	}
})(ko, amplify);