/*jshint browser: true, node: true */
(function (undefined) {
  'use strict';

  var MineViewModel = require("./mineViewModel.js");
  var ValueViewModel = require("./valueViewModel.js");

  var tileFactory = {
    createMine: function (column, row) {
      return new MineViewModel(column, row);
    },
    createBorder: function (column, row) {
      return {
        isBorder: true
      };
    },
    createTile: function (column, row) {
      return new ValueViewModel(column, row);
    },
    isMine: function (tile) {
      return tile instanceof MineViewModel;
    },
    isValue: function (tile) {
      return tile instanceof ValueViewModel;
    },
    isBorder: function (tile) {
      return tile && tile.isBorder;
    },
    incrementValue: function (tile) {
      tile.value(tile.value() + 1);
    }
  };

  module.exports = tileFactory;
})();
