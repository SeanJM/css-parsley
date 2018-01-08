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
      console.log(p[0].toString());
      return p[0].toString();
    })
    .isDeepEqual(function () {
      return [
        "@media only screen and (min-device-width : 601px) {",
        "  .content {",
        "    width: 600px !important;",
        "  }",
        "}",
        ""
      ].join("\n");
    });
};
