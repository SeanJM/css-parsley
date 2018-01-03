const parse    = require("../index");
const tinyTest = require("tiny-test");

module.exports = tinyTest(function (test, load) {
  require("./basic")(test);

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

  test("Styles + comments")
    .this(function () {
      const str = [
        "body {",
        "  margin: 0;",
        "  padding: 0; }",
        "",
        "table, .container {",
        "  border-collapse: collapse; }",
        "",
        ".container {",
        "  width: 100%;",
        "  background: #879dab; }",
        "/*# sourceMappingURL=index.css.map */"
      ].join("\n");
      const p = parse(str);
      return p;
    })
    .isDeepEqual(function () {
      return [{
        type     : "style",
        selector : [
          "body"
        ],
        declaration : [{
          property : "margin",
          value    : "0"
        }, {
          property : "padding",
          value    : "0"
        }]
      }, {
        type     : "style",
        selector : [
          "table",
          ".container"
        ],
        declaration : [{
          property : "border-collapse",
          value    : "collapse"
        }]
      }, {
        type     : "style",
        selector : [
          ".container"
        ],
        declaration : [{
          property : "width",
          value    : "100%"
        }, {
          property : "background",
          value    : "#879dab"
        }]
      }, {
        type        : "comment",
        declaration : [ "# sourceMappingURL=index.css.map " ]
      }];
    });

  load();
});
