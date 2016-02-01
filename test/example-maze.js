var nock = require('nock');

/*
 * A sample maze for testing purposes
 *
 *     4 (exit)
 *     |
 * 1 - 2
 *     |
 *     3
 */

module.exports = function() {
  nock('http://example.com')
    .get('/')
    .reply(200, {
      _links: {
        east: {href: 'http://example.com?cellNum=2'}
      }
    })
    .get('/?cellNum=2')
    .twice()
    .reply(200, {
      _links: {
        north: {href: 'http://example.com?cellNum=4'},
        south: {href: 'http://example.com?cellNum=3'}
      }
    })
    .get('/?cellNum=3')
    .reply(200, {
      _links: {
        north: {href: 'http://example.com?cellNum=2'}
      }
    })
    .get('/?cellNum=4')
    .reply(200, {
      _links: {
        south: {href: 'http://example.com?cellNum=2'},
        exit: {href: 'http://example.com?cellNum=999'}
      }
    });
}
