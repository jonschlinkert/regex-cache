'use strict';

var cache = require('../..');
var fn = require('../../support.js');

module.exports = function(str, opts) {
  return cache(fn.toRegex, str, opts).exec('a abc foo xyz fooabc ab');
};
