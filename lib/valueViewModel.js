(function(ko, amplify, undefined) {
	var define = require("./define.js");
	var tileViewModel = require("./tileViewModel.js"); 
	var colors = ["silver", "blue", "green", "red", "purple", "yellow", "brown", "black", "orange" ]; 
	
	function valueViewModel(column, row, tile) {
		tileViewModel.apply(this, arguments); 
		this.value = ko.observable(tile && tile.value);

		this.getValueColor = ko.computed(function() {
			return colors[this.value()];
		}, this);

		this.isValue = ko.computed(function() {
			return !this.isCovered() && !this.isTagged();
		}, this); 
	};

	valueViewModel.prototype = new tileViewModel();
	valueViewModel.prototype.constructor = valueViewModel;

	if(typeof window === 'undefined') {
		module.exports = valueViewModel;
	} else {
		define("valueViewModel", valueViewModel);
	}
})(ko, amplify);