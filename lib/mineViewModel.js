/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function (ko, amplify, undefined) {
  'use strict';

  var events = require("./events.js");
  var TileViewModel = require("./tileViewModel.js");

  /*jshint validthis: true */
  function mineViewModel(column, row) {
    TileViewModel.apply(this, arguments);

    this.taggedState = false;
    this.armed = ko.observable(true);

    this.isMine = ko.computed(function () {
      return !this.isCovered() && !this.isTagged();
    }, this);

    this.disarm = function () {
      this.armed(false);
    }.bind(this);
    this.explode = function () {
      this.uncover(false);
    }.bind(this);

    this.destroy = function () {
      TileViewModel.prototype.destroy.call(this);

      amplify.unsubscribe(events.tile.exploded, this.explode);
      amplify.unsubscribe(events.tile.showMines, this.showMine);
      amplify.unsubscribe(events.tile.hideMines, this.hideMine);
      amplify.unsubscribe(events.tile.disarm, this.disarm);
    }.bind(this);

    this.uncover = function (raiseEvent) {
      TileViewModel.prototype.uncover.call(this, raiseEvent);

      if (raiseEvent) {
        amplify.publish(events.tile.exploded, true);
      }
    }.bind(this);

    this.showMine = function (recordState) {
      if (recordState) {
        this.taggedState = this.isTagged();
      }
      this.uncover(false);
    }.bind(this);

    this.hideMine = function () {
      this.isTagged(this.taggedState);
      this.isCovered(true);
    }.bind(this);

    amplify.subscribe(events.tile.exploded, this, this.explode);
    amplify.subscribe(events.tile.showMines, this, this.showMine);
    amplify.subscribe(events.tile.hideMines, this, this.hideMine);
    amplify.subscribe(events.tile.disarm, this, this.disarm);
  }

  mineViewModel.prototype = new TileViewModel();
  mineViewModel.prototype.constructor = mineViewModel;

  module.exports = mineViewModel;
})(ko, amplify);
