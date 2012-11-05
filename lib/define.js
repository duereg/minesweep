/*jshint browser: true */
(function() {
    'use strict';

    var define = function(name, value) {
        if(typeof window !== 'undefined') {
            window.minesweep = window.minesweep || {};
            window.minesweep[name] = value;
        }
    };

    define("define", define);
})();