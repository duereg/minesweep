if(typeof require === 'undefined') {
	var require = function(name) {
		var lastSlash = name.lastIndexOf("/");
		var lastDot = name.lastIndexOf(".");
		var name = name.substring(lastSlash + 1, lastDot );

		return window.minesweep[name];
	};

	if(typeof window !== 'undefined') {
        //Possibly polluting global namespace
		window.require = require;
	}
}

