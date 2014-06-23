/*jshint browser: true, node: true */
/*global ko:true, amplify: true */
(function (ko, amplify, undefined) {
  'use strict';

  var boardSize = 512;

  var events = require("./events.js");
  var boardFactory = require("./boardFactory.js");
  var tileFactory = require("./tileFactory.js");

  /*jshint validthis: true */
  var boardViewModel = function () {
    var me = this;

    this.minePositions = [];
    this.tiles = ko.observableArray();

    function uncover(column, row, start) {
      var tileToUncover = me.tiles()[row][column];

      if (tileFactory.isValue(tileToUncover) && (tileToUncover.isCovered() || start)) {
        tileToUncover.uncover(false);

        amplify.publish(events.board.uncover);

        if (tileToUncover.value() === 0) {

          uncover(column - 1, row, false);
          uncover(column + 1, row, false);
          uncover(column, row - 1, false);
          uncover(column, row + 1, false);
          uncover(column - 1, row - 1, false);
          uncover(column + 1, row + 1, false);
          uncover(column + 1, row - 1, false);
          uncover(column - 1, row + 1, false);
        }
      }
    }

    function resizeTiles(columns, rows) {
      var tileSize = 16;

      if (columns > rows) {
        tileSize = boardSize / columns;
      } else {
        tileSize = boardSize / rows;
      }

      if (tileSize < 16) {
        tileSize = 16;
      }

      amplify.publish(events.tile.resize, tileSize);
    }

    this.newGame = function (config) {
      amplify.publish(events.tile.destroy);
      var board = boardFactory(config.columns, config.rows, config.numMines);
      me.importTiles(board);
      resizeTiles(config.columns, config.rows);
    };

    //this handles tag event, and raises board.AllMinesTagged event
    this.allMinesAreTagged = function (allTagged) {
      if (allTagged) {
        for (var i = 0; i < me.minePositions.length; i++) {
          var position = me.minePositions[i];
          var tile = me.tiles()[position.row][position.column];
          if (!tile.isTagged()) {
            allTagged = false;
            break;
          }
        }
      }

      amplify.publish(events.board.allMinesTagged, allTagged);
    };

    this.importTiles = function (board) {
      if ( !! !board) throw "bad board";

      me.minePositions = board.minePositions;
      me.tiles.removeAll();
      me.tiles(board);
    };

    amplify.subscribe(events.tile.uncover, uncover);
    amplify.subscribe(events.board.newGame, me.newGame);
    amplify.subscribe(events.game.allTagsUsed, me.allMinesAreTagged);
  };

  module.exports = boardViewModel;
})(ko, amplify);
