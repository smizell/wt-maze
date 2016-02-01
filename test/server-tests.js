var expect = require('chai').expect;
var server = require('../server');

describe('Maze Server', function() {
  context('when given a cell number', function() {
    var representation;

    before(function(done) {
      server({
        data: {
          cellNum: 2
        }
      }, function(error, results) {
        representation = results;
        done(error);
      });
    });

    it('includes the right links', function() {
      expect(representation._links.east.href).to.contain('cellNum=7');
      expect(representation._links.south.href).to.contain('cellNum=3');
    });

    it('does not include the other links', function() {
      expect(representation._links.north).to.be.undefined;
      expect(representation._links.west).to.be.undefined;
    });
  });

  context('when not given a cell number', function() {
    var representation;

    before(function(done) {
      server({
        data: {}
      }, function(error, results) {
        representation = results;
        done(error);
      });
    });

    it('includes the right links', function() {
      expect(representation._links.east.href).to.contain('cellNum=5');
    });

    it('does not include the other links', function() {
      expect(representation._links.north).to.be.undefined;
      expect(representation._links.south).to.be.undefined;
      expect(representation._links.west).to.be.undefined;
    });
  });

  context('when given a cell number that does not exist', function() {
    var representation;

    before(function(done) {
      server({
        data: {
          cellNum: 789
        }
      }, function(error, results) {
        representation = results;
        done(error);
      });
    });

    it('includes the right links', function() {
      expect(representation._links.east.href).to.contain('cellNum=5');
    });

    it('does not include the other links', function() {
      expect(representation._links.north).to.be.undefined;
      expect(representation._links.south).to.be.undefined;
      expect(representation._links.west).to.be.undefined;
    });
  });
});
