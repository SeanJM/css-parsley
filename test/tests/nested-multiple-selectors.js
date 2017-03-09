const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'Nested multiple selectors',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/nested-multiple-selectors.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/nested-multiple-selectors.clean.scss'), 'utf8');
  }
};
