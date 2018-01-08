const parse = require("../index");

module.exports = function (test) {
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
        value : [{
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
