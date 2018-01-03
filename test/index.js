const parse    = require("../index");
const tinyTest = require("tiny-test");

module.exports = tinyTest(function (test, load) {
  test("Basic")
    .this(function () {
      const p = parse("body { color:red }");
      return p;
    })
    .isDeepEqual(function () {
      return [{
        type     : "style",
        selector : [ "body" ],
        declaration : [{
          property : "color",
          value    : "red"
        }]
      }];
    });

  test("Basic 2")
    .this(function () {
      const p = parse("body { color:red; background: green; }");
      return p;
    })
    .isDeepEqual(function () {
      return [{
        type     : "style",
        selector : [ "body" ],
        declaration : [{
          property : "color",
          value    : "red"
        }, {
          property : "background",
          value    : "green"
        }]
      }];
    });

  test("Multiple selectors")
    .this(function () {
      const p = parse(".selector, body { color:red; background: green; }");
      return p;
    })
    .isDeepEqual(function () {
      return [{
        type     : "style",
        selector : [
          ".selector",
          "body"
        ],
        declaration : [{
          property : "color",
          value    : "red"
        }, {
          property : "background",
          value    : "green"
        }]
      }];
    });

  load();
});
