/*!
 * regex-cache <https://github.com/jonschlinkert/regex-cache>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Expose `regexCache`
 */

module.exports = regexCache;

/**
 * Memoize the results of a call to the new RegExp constructor.
 *
 * @param  {Function} fn [description]
 * @param  {String} str [description]
 * @param  {Options} options [description]
 * @param  {Boolean} nocompare [description]
 * @return {RegExp}
 */

function regexCache(fn, str, options, nocompare) {
  var regex, cached;

  // `str` might be explicitly defined as `null`
  if (str === null || arguments.length === 1) {
    str = '_default_';
    nocompare = true;
    options = null;
    str = null;
  }

  if (cache.hasOwnProperty(str)) {
    cached = cache[str];
    // return early without comparing options
    if (nocompare) { return cached.regex; }

    // otherwise, compare options first
    if (equal(cached.opts, options)) {
      return cached.regex;
    }
  }

  if (str === '_default_') {
    regex = fn(options);
  } else {
    regex = fn(str, options);
  }

  memo(str, options, regex);
  return regex;
};

/**
 * Cache a `str` with the given `opts` and
 * generated `regex`.
 *
 * @param  {String} `str`
 * @param  {Object} `opts`
 * @param  {RegExp} `regex`
 */

function memo(str, opts, regex) {
  cache[str] = {regex: regex, opts: opts};
}

var cache = module.exports.cache = {};

/**
 * Return false if object A is different (enough) from object B.
 *
 * When creating the regex, memoization is used to increase
 * performance. This function tells us if options have changed
 * so we can generate a new regex instead of using the cached one.
 *
 * It seems like a lot of logic but in most cases this function
 * returns early.
 *
 * @param {Object} `a` cached options
 * @param {Object} `b` passed options
 * @return {Boolean}
 */

function equal(a, b, mode) {
  if (!a && !b) { return true; }
  if (!!a && !b) { return false; }
  if (!a && !!b) { return false; }

  var ak = Object.keys(a);
  var bk = Object.keys(b);
  var alen = a.length;
  var blen = b.length;

  if (alen !== blen) {
    return false;
  }

  if (alen === 0 && blen === 0) {
    return true;
  }

  var aa = JSON.stringify(a);
  var bb = JSON.stringify(b);
  if (aa != bb) {
    return false;
  }
  return true;
}
