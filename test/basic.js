const parse    = require("../index");

module.exports = function (test) {
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
};
