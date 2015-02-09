'use strict';

var cache = require('../..');
var mentionsRe = cache(require('mentions-regex'));

module.exports = function(str, opts) {
  return mentionsRe.test(str);
};
