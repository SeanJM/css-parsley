module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parser;

var _capture = __webpack_require__(1);

var _capture2 = _interopRequireDefault(_capture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parser(str) {
  var groups = [];
  var o = {
    str: str,
    index: 0,
    length: str.length
  };

  while (o.index < o.length) {
    if (!/\s/.test(str[o.index])) {
      groups.push((0, _capture2.default)(o));
    }
    o.index += 1;
  }

  return groups;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capture;

var _style = __webpack_require__(2);

var _style2 = _interopRequireDefault(_style);

var _comment = __webpack_require__(4);

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capture(o) {
  if (o.str.substring(o.index, o.index + 2) === "/*") {
    return (0, _comment2.default)(o);
  } else {
    return (0, _style2.default)(o);
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;

var _declaration = __webpack_require__(3);

var _declaration2 = _interopRequireDefault(_declaration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function style(o) {
  var result = {
    type: "style",
    selector: [],
    declaration: []
  };

  var index = 0;
  var length = o.str.indexOf("{", o.index);
  while (o.index < length) {
    while (/\s/.test(o.str[o.index])) {
      o.index += 1;
    }

    if (typeof result.selector[index] === "undefined") {
      result.selector[index] = "";
    }

    while (o.str[o.index] !== "," && o.index < length) {
      result.selector[index] += o.str[o.index];
      o.index += 1;
    }

    result.selector[index] = result.selector[index].trim();
    index += 1;
    o.index += 1;
  }

  result.declaration = (0, _declaration2.default)(o);
  return result;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = declaration;
function declaration(o) {
  var result = [];
  var length = o.str.indexOf("}", o.index);
  var index = 0;

  while (o.index < length) {
    while (/\s/.test(o.str[o.index])) {
      o.index += 1;
    }

    if (typeof result[index] === "undefined" && o.index < length) {
      result[index] = {
        property: "",
        value: ""
      };

      while (o.str[o.index] !== ":" && o.index < length) {
        result[index].property += o.str[o.index];
        o.index += 1;
      }
      result[index].property = result[index].property.trim();
      o.index += 1;

      while (o.str[o.index] !== ";" && o.index < length) {
        result[index].value += o.str[o.index];
        o.index += 1;
      }
      result[index].value = result[index].value.trim();
    }

    index += 1;
    o.index += 1;
  }

  return result;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = comment;
function comment(o) {
  var result = {
    type: "comment",
    declaration: []
  };

  var length = o.str.indexOf("*/", o.index);
  var str = "";

  o.index += 2;

  while (o.index < length) {
    str += o.str[o.index];
    o.index += 1;
  }

  o.index += 1;
  result.declaration = str.split("\n");
  return result;
}

/***/ })
/******/ ])["default"];
//# sourceMappingURL=index.js.map