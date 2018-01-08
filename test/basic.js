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
        selector : [
          "body"
        ],
        value: [
          {
            type     : "declaration",
            property : "color",
            value    : "red"
          }
        ]
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
        selector : [
          "body"
        ],
        value: [{
          type     : "declaration",
          property : "color",
          value    : "red"
        }, {
          type     : "declaration",
          property : "background",
          value    : "green"
        }]
      }];
    });
};
