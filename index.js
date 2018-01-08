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

var _captureRule = __webpack_require__(6);

var _captureRule2 = _interopRequireDefault(_captureRule);

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
      groups.push((0, _captureRule2.default)(o));
    }
    o.index += 1;
  }

  return groups;
};

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;

var _IS_SPACE = __webpack_require__(9);

var _IS_SPACE2 = _interopRequireDefault(_IS_SPACE);

var _block = __webpack_require__(7);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function style(o) {
  var result = {
    type: "style",
    selector: [],
    value: []
  };

  var length = o.str.indexOf("{", o.index);
  var selector = "";

  while (_IS_SPACE2.default[o.str[o.index]] && o.str[o.index]) {
    o.index += 1;
  }

  while (o.index < length) {
    selector += o.str[o.index];
    o.index += 1;
  }

  result.selector = selector.split(",").map(function (a) {
    return a.trim();
  });
  result.value = (0, _block2.default)(o);
  return result;
}

/***/ }),
/* 3 */,
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

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = captureBlock;

var _style = __webpack_require__(2);

var _style2 = _interopRequireDefault(_style);

var _comment = __webpack_require__(4);

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function captureBlock(o) {
  var s = o.str.substring(o.index);
  if (s.substring(0, 2) === "/*") {
    return (0, _comment2.default)(o);
  } else {
    return (0, _style2.default)(o);
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = block;

var _captureDeclaration = __webpack_require__(8);

var _captureDeclaration2 = _interopRequireDefault(_captureDeclaration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function block(o) {
  var children = [];
  var capture = true;
  var open = 0;
  var s = "";

  while (capture && o.str[o.index]) {
    s = o.str.substring(o.index);

    if (o.str[o.index] === "{") {
      open += 1;
    } else if (o.str[o.index] === "}") {
      open -= 1;
    } else if (/^[a-z-]+(\s+|):/.test(s)) {
      children.push((0, _captureDeclaration2.default)(o));
    }

    if (open === 0) {
      capture = false;
    }

    o.index += 1;
  }

  return children;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = captureDeclaration;
function captureDeclaration(o) {
  var property = "";
  var value = "";

  var element = {
    type: "declaration"
  };

  var capture = true;

  while (o.str[o.index] !== ":" && o.index < o.length) {
    property += o.str[o.index];
    o.index += 1;
  }

  o.index += 1;

  while (capture && o.index < o.length) {
    if (o.str.substring(o.index, o.index + 2) === "#{") {
      while (o.str[o.index] !== "}") {
        value += o.str[o.index];
        o.index += 1;
      }
    } else if (o.str[o.index] === ";" || o.str[o.index] === "}") {
      capture = false;
    } else {
      value += o.str[o.index];
      o.index += 1;
    }
  }

  element.property = property.trim();
  element.value = value.trim();
  return element;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  " ": true,
  "\t": true,
  "\n": true
};

/***/ })
/******/ ])["default"];
//# sourceMappingURL=index.js.map