const tinyTest = require("tiny-test");

module.exports = tinyTest(function (test, load) {
  require("./basic")(test);
  require("./selectors")(test);
  require("./comments")(test);
  require("./mediaQuery")(test);
  require("./toString")(test);
  load();
});
