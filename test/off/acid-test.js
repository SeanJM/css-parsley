const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'acid test',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/tests/acid-test.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/tests/acid-test.clean.scss'), 'utf8');
  }
};