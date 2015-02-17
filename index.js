/*!
 * regex-cache <https://github.com/jonschlinkert/regex-cache>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var toKey = require('to-key');

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

// function regexCache(fn, str, options) {
//   var key = '_default_', regex;

//   if (!str) {
//     if (cache[key]) {
//       return cache[key].regex;
//     }
//     memo(key, null, (regex = fn()));
//     return regex;
//   }

//   if (!options) {
//     key = typeof str === 'string' ? str : key = toKey(str);

//     if (cache[key]) {
//       return cache[key].regex;
//     }
//     memo(key, null, (regex = fn(str)));
//     return regex;
//   }

//   key = str + toKey(options);
//   if (cache[key]) {
//     return cache[key].regex;
//   }

//   memo(key, null, (regex = fn(str, options)));
//   return regex;
// }

function regexCache(fn, str, opts) {
  var key = '_default_', regex, cached;

  if (!str && !opts) {
    if (typeof fn !== 'function') {
      return fn;
    }
    return basic[key] || (basic[key] = fn());
  }

  var isString = typeof str === 'string';
  if (isString) {
    key = str;
  } else {
    opts = str;
  }

  if (!opts) {
    if (isString) {
      return basic[key] || (basic[key] = fn(key));
    }

    // else, `str` is an object
    // cached = cache[key];
    // opts = str;

    // if (cached && equal(cached.opts, opts)) {
    //   return cached.regex;
    // }

    // memo(key, opts, (regex = fn(str)));
    // return regex;
  }

  cached = cache[key];
  if (cached && equal(cached.opts, opts)) {
    return cached.regex;
  }

  memo(key, opts, (regex = fn(str, opts)));
  return regex;
}

function memo(key, opts, regex) {
  cache[key] = {regex: regex, opts: opts};
}

function equal(a, b) {
  for (var key in b) {
    if (!a[key]) {
      return false;
    }
    if (a[key] !== b[key]) {
      return false;
    }
    if (typeof b[key] === 'object') {
      return false;
    }
  }
  return true;
}

/**
 * Expose `cache`
 */

var cache = module.exports.cache = {};
var basic = module.exports.basic = {};
