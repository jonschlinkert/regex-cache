'use strict';

exports.toRegex = function toRegex(str, opts) {
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
    ? '(' + re + ')'
    : '([^\W]?)';
  return new RegExp(re, f);
};
