const parse = require("../index");

module.exports = function (test) {
  test("Media Query and style")
    .this(function () {
      const str = `
      @media only screen and (min-device-width: 601px) {
        .content {
          width: 600px !important;
        }
      }

      .info + .info .spacer {
        height: 24px;
      }
      `;
      const p = parse(str);
      return p;
    })
    .isDeepEqual(function () {
      return [{
        type: "media",
        selector: [
          "only screen and (min-device-width: 601px)"
        ],
        value: [
          {
            type: "style",
            selector: [
              ".content"
            ],
            value: [
              {
                type: "declaration",
                property: "width",
                value: "600px !important"
              }
            ]
          }
        ]
      },
      {
        type: "style",
        selector: [
          ".info + .info .spacer"
        ],
        value: [
          {
            type: "declaration",
            property: "height",
            value: "24px"
          }
        ]
      }];
    });
};
