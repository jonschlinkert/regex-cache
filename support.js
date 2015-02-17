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
  if (opts.d && opts.d.e) re += opts.d.e;

  if (opts.e) re += 'e';
  if (opts.f) re += 'f';
  if (opts.g) re += 'g';
  if (opts.h) re += 'h';
  if (opts.i) re += 'i';
  if (opts.j) re += 'j';
  if (opts.k) re += 'k';
  if (opts.l) re += 'l';
  if (opts.m) re += 'm';
  if (opts.n) re += 'n';
  if (opts.o) re += 'o';
  if (opts.p) re += 'p';
  if (opts.q) re += 'q';
  if (opts.r) re += 'r';
  if (opts.s) re += 's';
  if (opts.t) re += 't';

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
