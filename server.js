var lodash = require('lodash');
var qs = require('qs');

// The URL of this web task
var mazeUrl = 'https://webtask.it.auth0.com/api/run/wt-smizell-gmail_com-0/server'

// The cells of our maze. A cell may have north, south, east, and west
// affordances along with an exit affordanc when available.
var cells = {
  0: {east: 5},
  1: {east: 6},
  2: {east: 7, south: 3},
  3: {north: 2, south: 4},
  4: {north: 3, east: 9},
  5: {east: 10, west: 0},
  6: {south: 7, west: 1},
  7: {north: 6, east: 12, west: 2},
  8: {east: 13, south: 9},
  9: {north: 8, west: 4},
  10: {south: 11, west: 5},
  11: {north: 10, east: 16},
  12: {west: 7},
  13: {south: 14, west: 8},
  14: {north: 13, east: 19},
  15: {east: 20},
  16: {east: 21, west: 11},
  17: {east: 22, south: 18},
  18: {north: 17, south: 19},
  19: {north: 18, east: 24, west: 14},
  20: {south: 21, west: 15},
  21: {north: 20, south: 22, west: 16},
  22: {north: 21, west: 17},
  23: {south: 24},
  24: {north: 23, exit: 999}
};

// Start cell number, so you can start the client wherever you like
var startCellNum = 0;

module.exports = function(context, callback) {
  // Always fall back to the start cell to prevent bad states
  var cellNum = lodash.get(context, 'data.cellNum', startCellNum);
  var cell = cells[cellNum] || cells[startCellNum];
  return callback(null, buildRepresentation(cell));
}

// Private functions
// ----------------

function buildUrl(cellNum) {
  return mazeUrl + '?' + qs.stringify({cellNum: cellNum});
}

function buildRepresentation(cell) {
  // This is a HAL representation of the current cell state
  // Spec at http://stateless.co/hal_specification.html
  var representation = {_links: {}};
  lodash.forEach(cell, function(cellNum, rel) {
    representation._links[rel] = {href: buildUrl(cellNum)};
  });
  return representation;
}
