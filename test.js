/*!
 * regex-cache <https://github.com/jonschlinkert/regex-cache>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var cache = require('./');
var mentions = require('mentions-regex');

var cached = cache(mentions);
var str = 'a @abc @foo xyz';

it('should use the un-cached regex to match:', function () {
  var matches = str.match(mentions());
  matches[1].should.equal('abc');
});

it('should use the cached regex to match:', function () {
  var matches = str.match(cached);
  matches[1].should.equal('abc');
});

