const tinyTest = require("tiny-test");

module.exports = tinyTest(function (test, load) {
  require("./basic")(test);
  require("./selectors")(test);
  require("./mediaQuery")(test);
  load();
});
