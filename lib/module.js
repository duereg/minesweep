/*jshint browser: true, es5: true */
(function(window, document, require) {
	'use strict';

	var define = require("./define.js");

	if(typeof module === 'undefined') {

		var module = {
			func: null,
			get exports() {
				return this.func;
			},
			set exports(x) {
				this.func = x;

				var scripts = document.getElementsByTagName("SCRIPT");
				var script = scripts[scripts.length - 1].src;

				define(require.getNameFromPath(script), this.func);
			}
		};

		if(typeof window !== 'undefined') {
			window.module = module;
		}
	}
})(window, document, require);