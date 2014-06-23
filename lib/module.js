/*jshint browser: true, es5: true */
(function (window, document, require) {
  'use strict';

  if (typeof module === 'undefined') {
    if (typeof window === 'undefined') throw "Window must be defined to continue";

    var module = {
      func: null,
      get exports() {
        return this.func;
      },
      set exports(x) {
        this.func = x;

        var scripts = document.getElementsByTagName("SCRIPT");
        var script = scripts[scripts.length - 1].src;
        var name = require.getNameFromPath(script);

        window.minesweep = window.minesweep || {};
        window.minesweep[name] = this.func;
      }
    };
    window.module = module;
  }
})(window, document, require);
