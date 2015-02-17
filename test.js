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

var str = 'a @abc @foo xyz';

function toRegex(str, opts) {
  if (typeof str !== 'string') {
    opts = str;
    str = '';
  }
  opts = opts || {};
  var re = str || '';

  if (opts.a) re += 'a';
  if (opts.b) re += 'b';
  if (opts.c) re += 'c';

  var f = opts.flags || '';
  re = re
    ? '@\(' + re + '\)'
    : '@\(.*\)';
  return new RegExp(re, f);
}

describe('no cache:', function () {
  it('should use the un-cached regex to match:', function () {
    var matches = str.match(mentions());
    matches[1].should.equal('abc');
  });
});

describe('with cache:', function () {
  it('should use the cached regex to match:', function () {
    var cached = cache(mentions);
    var matches = str.match(cached);
    matches[1].should.equal('abc');
  });

  it('should work when options are passed:', function () {
    var opts = {startSpace: false, endSpace: false, length: 30, match: '\\w{1,30}', dot: false };
    var cached = cache(mentions, opts);
    var matches = str.match(cached);
    matches[1].should.equal('abc');
  });
});

console.log(toRegex())
console.log(toRegex({a: true, b: true, c: true}))
console.log(toRegex('foo'))
console.log(toRegex('foo', {flags: 'g'}))
