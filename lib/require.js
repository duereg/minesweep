/*jshint browser: true */
(function() {
    'use strict';

    if(typeof require === 'undefined') {
        var require = function(path) {
            var lastSlash = path.lastIndexOf("/");
            var lastDot = path.lastIndexOf(".");
            var name = path.substring(lastSlash + 1, lastDot);

            return window.minesweep[name];
        };

        if(typeof window !== 'undefined') {
            window.require = require;
        }
    }
})();