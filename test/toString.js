const parse = require("../index");

module.exports = function (test) {
  test("Media Query (toString)")
    .this(function () {
      const css = `
      @media
        only screen
        and (min-device-width : 601px) {
        .content {
          width : 600px !important;
        }
      }
      `;
      const p = parse(css);
      return p[0].toString();
    })
    .isEqual(function () {
      return [
        "@media",
        "  only screen and (min-device-width : 601px) {",
        "  .content {",
        "    width: 600px !important;",
        "  }",
        "}",
        ""
      ].join("\n");
    });

  test("Multiline Media Query (toString)")
    .this(function () {
      const css = `
      @media
        only screen
        and (min-device-width : 601px),
        only screen
        and (min-device-width : 601px) {
        .content {
          width : 600px !important;
        }
      }
      `;
      const p = parse(css);
      return p[0].toString();
    })
    .isEqual(function () {
      return [
        "@media",
        "  only screen and (min-device-width : 601px),",
        "  only screen and (min-device-width : 601px) {",
        "  .content {",
        "    width: 600px !important;",
        "  }",
        "}",
        ""
      ].join("\n");
    });

  test("Multi line comment (toString)")
    .this(function () {
      const css = `/* this is a comment */`;
      const p = parse(css);
      return p[0].toString();
    })
    .isEqual(function () {
      return "/* this is a comment */\n";
    });

  test("Single line comment (toString)")
    .this(function () {
      const css = `
        /*
          this is a comment
          with many lines
        */
      `;
      const p = parse(css);
      return p[0].toString();
    })
    .isEqual(function () {
      return [
        "/*",
        "  this is a comment",
        "  with many lines",
        "*/",
        ""
      ].join("\n");
    });
};
