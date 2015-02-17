/*!
 * regex-cache <https://github.com/jonschlinkert/regex-cache>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var should = require('should');
var cache = require('./');
var fn = require('./support');

var str = 'a abc foo xyz fooabc';

describe('regex-cache:', function () {
  describe('no cache:', function () {
    it('should use the un-cached regex to match:', function () {
      var matches = str.match(fn.toRegex());
      matches[1].should.equal('a');
    });
  });

  describe('when a function is passed:', function () {
    it('should call the function when no other arguments are passed:', function () {
      str.match(cache(fn.toRegex))[1].should.equal('a');
    });

    it('should cache the results on the `_default_` key:', function () {
      str.match(cache(fn.toRegex))[1].should.equal('a');
      cache.cache.should.have.property('_default_');
    });
  });

  describe('with cache:', function () {
    it('should use the cached regex to match:', function () {
      var cached = cache(fn.toRegex);
      var a = str.match(cached);
      var b = str.match(cached);
      var c = str.match(cached);
      var d = str.match(cached);
      var e = str.match(cached);
      e[1].should.equal('a');
      cache.cache.should.have.property('_default_');
    });

    it('should work when a regex is passed:', function () {
      str.match(cache(fn.toRegex()))[1].should.equal('a');
      cache.cache.should.have.property('_default_');
    });

    it('should work when a function is passed:', function () {
      str.match(cache(fn.toRegex))[1].should.equal('a');
      cache.cache.should.have.property('_default_');
    });

    it('should work when options are passed:', function () {
      str.match(cache(fn.toRegex()))[1].should.equal('a');
      str.match(cache(fn.toRegex, 'foo'))[1].should.equal('foo');
      str.match(cache(fn.toRegex, 'foo', { a: true, b: true, c: true }))[1].should.equal('fooabc');
      str.match(cache(fn.toRegex, { a: true, b: true, c: true }))[1].should.equal('abc');
      str.match(cache(fn.toRegex, { a: true, b: true, c: true, flags: 'g'}))[0].should.equal('abc');
    });
  });

  describe('cache object:', function () {
    it('should expose the cache:', function () {
      cache(fn.toRegex());
      cache.cache.should.have.property('_default_');

      cache(fn.toRegex, 'foo');
      cache.cache.should.have.property('foo');

      cache(fn.toRegex, 'foo', { a: true, b: true, c: true });
      cache.cache.should.have.property('fooatruebtruectrue');

      cache(fn.toRegex, { a: true, b: true, c: true });
      cache.cache.should.have.property('atruebtruectrue');

      cache(fn.toRegex, { a: true, b: true, c: true, flags: 'g'});
      cache.cache.should.have.property('atruebtruectrueflagsg');
      cache.cache.should.have.property('foo');
    });
  });
});
