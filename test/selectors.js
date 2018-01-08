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
        value : [{
          type     : "declaration",
          property : "margin",
          value    : "0"
        }, {
          type     : "declaration",
          property : "padding",
          value    : "0"
        }]
      }, {
        type     : "style",
        selector : [
          "table",
          ".container"
        ],
        value : [{
          type     : "declaration",
          property : "border-collapse",
          value    : "collapse"
        }]
      }, {
        type     : "style",
        selector : [
          ".container"
        ],
        value : [{
          type     : "declaration",
          property : "width",
          value    : "100%"
        }, {
          type     : "declaration",
          property : "background",
          value    : "#879dab"
        }]
      }, {
        type        : "comment",
        declaration : [ "# sourceMappingURL=index.css.map " ]
      }];
    });
};
