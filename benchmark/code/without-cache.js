'use strict';

var fn = require('../../support.js');

module.exports = function(str, opts) {
  return fn.toRegex(str, opts).exec('a abc foo xyz fooabc ab');
};
