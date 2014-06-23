/*jshint browser: true, node: true */
(function () {
  'use strict';

  var events = {
    tile: {
      uncover: "tile.uncover",
      tag: "tile.tagged",
      resize: "tile.resize",
      destroy: "tile.destroy",

      exploded: "tile.exploded",
      showMines: "tile.showMines",
      hideMines: "tile.hideMines",
      disarm: "tile.disarmMines"
    },
    board: {
      newGame: "board.newGame",
      uncover: "board.uncover",
      allMinesTagged: "board.allMinesTagged"
    },
    game: {
      isValid: "game.isValid",
      canValidate: "game.canValidate",
      reset: "game.reset",
      gameOver: "game.gameOver",

      allTilesAreMines: "game.coveredTilesEqualMines",
      allTagsUsed: "game.allTagsUsed"
    }
  };

  module.exports = events;
})();
