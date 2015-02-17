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
  if (opts.x) re += 'x';
  if (opts.y) re += 'y';
  if (opts.z) re += 'z';

  var f = opts.flags || '';
  re = re
    ? '(' + re + ')'
    : '([^\W]?)';

  // filler for some other logic
  if (re.indexOf('x') !== -1) {
    re = re.replace(/x/g, '');
  }
  if (re.indexOf('y') !== -1) {
    re = re.replace(/y/g, '');
  }
  if (re.indexOf('z') !== -1) {
    re = re.replace(/z/g, '');
  }
  return new RegExp(re, f);
};
