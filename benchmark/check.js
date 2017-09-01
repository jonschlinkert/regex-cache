'use strict';

var fs = require('fs');
var path = require('path');
var mm = require('micromatch');
var bold = require('ansi-bold');

/**
 * Sanity check. run to ensure that all fns return a correct
 * result.
 */

fs.readdirSync(__dirname + '/code').forEach(function (fp) {
  if (mm.isMatch(fp, '*.js')) {
    var fn = require(path.resolve(__dirname, 'code', fp));
    var name = path.basename(fp, path.extname(fp));

    fs.readdirSync(__dirname + '/fixtures').forEach(function (fixture) {
      if (mm.isMatch(fixture, '*.js')) {
        fixture = path.resolve(__dirname, 'fixtures', fixture);
        console.log(bold(name) + ':', fn.apply(null, require(fixture)));
      }
    });
  }
});
