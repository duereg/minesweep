/*jshint browser: true */
(function (window) {
  'use strict';

  if (typeof require === 'undefined') {
    var getNameFromPath = function (path) {
      var lastSlash = path.lastIndexOf("/");
      var lastDot = path.lastIndexOf(".");
      return path.substring(lastSlash + 1, lastDot);
    };

    var require = function (path) {
      var name = getNameFromPath(path);
      return window.minesweep[name];
    };

    require.getNameFromPath = getNameFromPath;

    if (typeof window !== 'undefined') {
      window.require = require;
    }
  }
})(window);
