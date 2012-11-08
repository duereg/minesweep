/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function(ko, amplify, undefined) {
	'use strict';

	var define = require("./define.js");
	var events = require("./events.js");

    /*jshint validthis: true */
	function TileViewModel(column, row) {
		this.isCovered = ko.observable(true); 
		this.isTagged = ko.observable(false);
		this.size = ko.observable(16);
		this.column = column;
		this.row = row; 

		this.sizeInPixels = ko.computed(function() {
			return this.size() + "px";
		}, this);

		this.isBlank = ko.computed(function() {
			return this.isCovered() && !this.isTagged();
		}, this);

		amplify.subscribe(events.tile.resize, this, this.size);
		amplify.subscribe(events.tile.destroy, this, this.destroy);
	}

	TileViewModel.prototype.destroy = function() {
		amplify.unsubscribe(events.tile.resize, this.size);
		amplify.unsubscribe(events.tile.destroy, this.destroy);
	};

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