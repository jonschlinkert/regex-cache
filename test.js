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
var fn = require('./support');

var str = 'a abc foo xyz fooabc';

describe('no cache:', function () {
  it('should use the un-cached regex to match:', function () {
    var matches = str.match(fn.toRegex());
    matches[1].should.equal('a');
  });
});

describe('with cache:', function () {
  it('should use the cached regex to match:', function () {
    var cached = cache(fn.toRegex);
    var matches = str.match(cached);
    matches[1].should.equal('a');
  });

  it('should work when options are passed:', function () {
    str.match(cache(fn.toRegex, 'foo'))[1].should.equal('foo');
    str.match(cache(fn.toRegex, 'foo', { a: true, b: true, c: true }))[1].should.equal('fooabc');
    str.match(cache(fn.toRegex, { a: true, b: true, c: true }))[1].should.equal('abc');
    str.match(cache(fn.toRegex, { a: true, b: true, c: true, flags: 'g'}))[0].should.equal('abc');
  });
});
