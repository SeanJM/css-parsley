const parse = require("../index");

module.exports = function (test) {
  test("Media Query (screen)")
    .this(function () {
      const css = `
      @media screen {
        .selector {
          color : red;
        }
      }
      `;
      const p = parse(css);
      return p;
    })
    .isDeepEqual(function () {
      return [{
        type     : "media",
        selector : [
          "screen"
        ],
        value : [
          {
            type     : "style",
            selector : [
              ".selector"
            ],
            value    : [{
              type     : "declaration",
              property : "color",
              value    : "red"
            }]
          }
        ]
      }];
    });
};
