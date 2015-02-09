'use strict';

var mentionsRe = require('mentions-regex');

module.exports = function(str, opts) {
  return mentionsRe(opts).test(str);
};
