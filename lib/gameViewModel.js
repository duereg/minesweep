/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function (ko, amplify, undefined) {
  'use strict';

  var events = require("./events.js");

  var gameViewModel = function (config, maxRows, maxColumns) {
    if ( !! !config) throw "bad config";

    var me = this;

    this.maxColumns = config.maxColumns;
    this.maxRows = config.maxRows;
    this.cheating = false;

    this.columns = ko.observable(config.columns);
    this.rows = ko.observable(config.rows);
    this.numMines = ko.observable(config.numMines);
    this.minesTagged = ko.observable(0);
    this.allMinesTagged = ko.observable(false);
    this.tilesCovered = ko.observable(this.columns() * this.rows());
    this.failure = ko.observable(false);
    this.success = ko.observable(false);

    this.maxMines = ko.computed(function () {
      return me.columns() * me.rows();
    });
    this.tilesLeft = ko.computed(function () {
      return me.tilesCovered() - me.minesTagged();
    });
    this.tooFewMines = ko.computed(function () {
      return me.numMines() < 1;
    });
    this.tooFewColumns = ko.computed(function () {
      return me.columns() < 2;
    });
    this.tooFewRows = ko.computed(function () {
      return me.rows() < 2;
    });
    this.tooManyColumns = ko.computed(function () {
      return me.columns() > me.maxColumns;
    });
    this.tooManyRows = ko.computed(function () {
      return me.rows() > me.maxRows;
    });
    this.allTagsUsed = ko.computed(function () {
      return me.minesTagged() === me.numMines();
    });
    this.coveredTilesEqualMines = ko.computed(function () {
      return me.tilesCovered() === me.numMines();
    });
    this.gameOver = ko.computed(function () {
      return me.success() || me.failure();
    });

    this.tooManyMines = ko.computed(function () {
      return (me.columns() > 0) && (me.rows() > 0) && (me.maxMines() < me.numMines());
    });

    this.gameIsValid = ko.computed(function () {
      return !me.tooManyMines() && !me.tooFewRows() && !me.tooFewColumns() && !me.tooFewMines() && !me.tooManyRows() && !me.tooManyColumns();
    });

    this.canValidate = ko.computed(function () {
      return !me.failure() && (me.coveredTilesEqualMines() || me.allTagsUsed());
    });

    function uncover() {
      me.tilesCovered(me.tilesCovered() - 1);
    }

    function toggleTag(tileToToggle) {
      if (!me.cheating && !me.gameOver()) {
        if (tileToToggle.isTagged()) {
          if (me.numMines() > me.minesTagged()) {
            me.minesTagged(me.minesTagged() + 1);
          } else {
            tileToToggle.isTagged(false);
          }
        } else {
          me.minesTagged(me.minesTagged() - 1);
        }

        amplify.publish(events.game.allTagsUsed, me.allTagsUsed());
      }
    }

    this.newGame = function () {
      if (me.gameIsValid()) {
        me.success(false);
        me.failure(false);
        me.allMinesTagged(false);
        me.columns(parseInt(me.columns(), 10));
        me.rows(parseInt(me.rows(), 10));
        me.numMines(parseInt(this.numMines(), 10));
        me.tilesCovered(me.columns() * me.rows());
        me.minesTagged(0);

        var config = {
          columns: me.columns(),
          rows: me.rows(),
          numMines: me.numMines(),
          maxRows: me.maxRows,
          maxColumns: me.maxColumns
        };

        amplify.publish(events.board.newGame, config);
      }
    };

    this.validateGame = function () {
      if (me.canValidate()) {
        var isValid = true;
        if ((me.allTagsUsed()) && (me.minesTagged() !== me.tilesCovered())) {
          isValid = me.allMinesTagged();
        }
        me.success(isValid);
        me.failure(!isValid);

        if (isValid) {
          amplify.publish(events.tile.disarm);
        }

        amplify.publish(events.tile.showMines, false);
      }
    };

    this.cheat = function () {
      if (!me.gameOver()) {
        me.cheating = true;
        amplify.publish(events.tile.showMines, true);
      }
    };

    this.uncheat = function () {
      if (!me.gameOver()) {
        amplify.publish(events.tile.hideMines);
        me.cheating = false;
      }
    };

    amplify.subscribe(events.tile.tag, toggleTag);
    amplify.subscribe(events.tile.exploded, me.failure);
    amplify.subscribe(events.board.uncover, uncover);
    amplify.subscribe(events.board.allMinesTagged, me.allMinesTagged);
  };

  module.exports = gameViewModel;
})(ko, amplify);
