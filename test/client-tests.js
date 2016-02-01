var expect = require('chai').expect;

var exampleMaze = require('./example-maze');
var client = require('../client');

describe('Maze Client', function() {
  context('when not given a maze URL', function() {
    var mazeResults;

    before(function(done) {
      client({
        data: {}
      }, function(error, results) {
        mazeResults = results;
        done(error);
      });
    });

    it('returns waiting message', function() {
      expect(mazeResults.message).to.equal('No URL given, still waiting...');
    });
  });

  context('when given a maze URL', function() {
    var mazeResults;

    before(function(done) {
      // Sets up our maze with nock
      exampleMaze();

      client({
        data: {
          mazeUrl: 'http://example.com'
        }
      }, function(error, results) {
        mazeResults = results;
        done(error);
      });
    });

    it('solves the maze', function() {
      expect(mazeResults).to.deep.equal({
        moves: 5,
        message: 'Maze solved!'
      })
    });
  });
});
