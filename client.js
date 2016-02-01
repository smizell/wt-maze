var async = require('async');
var lodash = require('lodash');
var request = require('request');

// These decisions are based on the right hand rule for solving mazes. This
// means that we basically keep our right hand on the wall and never take it off
// until we've found an exit.
var decisions = {
  'north': ['east', 'north', 'west', 'south'],
  'east': ['south', 'east', 'north', 'west'],
  'south': ['west', 'south', 'east', 'north'],
  'west': ['north', 'west', 'south', 'east']
};

module.exports = function(context, callback) {
  var mazeUrl = lodash.get(context, 'data.mazeUrl');

  // Can't solve a maze without a URL
  if (!mazeUrl) {
    return callback(null, {
      message: 'No URL given, still waiting...'
    });
  }

  // Initial state for our traveler through the maze
  var traveler = {
    started: false,
    moves: 0,
    facing: 'north',
    nextUrl: mazeUrl,
    currentCell: undefined
  };

  async.whilst(
    function() {
      if (lodash.get(traveler.currentCell, '_links.exit')) {
        // No need to request the last exit, just bump moves and finish
        traveler.moves++;
        return false;
      } else {
        return true;
      }
    },
    function(next) {
      request(traveler.nextUrl, function(error, response, body) {
        // We don't count moves until we've moved, so our first request should
        // not count as a step
        if (traveler.started) {
          traveler.moves++;
        } else {
          traveler.started = true;
        }
        traveler.currentCell = JSON.parse(body);
        traveler.facing = makeDecision(traveler.facing, traveler.currentCell);
        traveler.nextUrl = getNextUrl(traveler.facing, traveler.currentCell);
        return next(error);
      });
    },
    function(error) {
      return callback(error, {
        moves: traveler.moves,
        message: 'Maze solved!'
      });
    }
  );
}

// Private functions
// ----------------

// Look for an open door in the cell, and if not found, leave the
// direction we entered.
function makeDecision(facing, cell) {
  var decision = decisions[facing];
  for (var i = 0; i < decision.length; i++) {
    if (lodash.get(cell, ['_links', decision[i]])) {
      return decision[i];
    }
  }
}

function getNextUrl(facing, cell) {
  return lodash.get(cell, ['_links', facing, 'href']);
}
