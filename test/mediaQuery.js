const parse = require("../index");

module.exports = function (test) {
  test("Media Query (screen)")
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
      return p;
    })
    .isDeepEqual(function () {
      return [{
        type     : "media",
        selector : [ "only screen and (min-device-width : 601px)" ],
        value : [{
          type     : "style",
          selector : [ ".content" ],
          value : [{
            type     : "declaration",
            property : "width",
            value    : "600px !important"
          }]
        }]
      }];
    });
};
