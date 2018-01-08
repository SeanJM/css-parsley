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
  var o = {
    str: str,
    index: 0,
    length: str.length
  };

  return (0, _capture2.default)(o);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capture;

var _captureRule = __webpack_require__(6);

var _captureRule2 = _interopRequireDefault(_captureRule);

var _IS_SPACE = __webpack_require__(9);

var _IS_SPACE2 = _interopRequireDefault(_IS_SPACE);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capture(o) {
  var groups = [];
  var open = 0;
  var start = o.index;

  while (_IS_SPACE2.default[o.str[o.index]]) {
    o.index += 1;
  }

  start = o.index;

  if (o.str[start] === "{") {
    start += 1;
    open += 1;
    o.index += 1;
    while (open && o.str[start]) {
      if (o.str[start] === "}") {
        open -= 1;
      } else if (o.str[start] === "{") {
        open += 1;
      }
      start += 1;
    }
    o.length = start - 1;
  }

  while (o.index < o.length) {
    if (!_IS_SPACE2.default[o.str[o.index]]) {
      groups.push((0, _captureRule2.default)(o));
    }
    o.index += 1;
  }

  return groups;
}

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = captureRule;

var _captureStyle = __webpack_require__(11);

var _captureStyle2 = _interopRequireDefault(_captureStyle);

var _captureComment = __webpack_require__(10);

var _captureComment2 = _interopRequireDefault(_captureComment);

var _captureMedia = __webpack_require__(12);

var _captureMedia2 = _interopRequireDefault(_captureMedia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function captureRule(o) {
  var s = o.str.substring(o.index);
  if (s.substring(0, 2) === "/*") {
    return (0, _captureComment2.default)(o);
  } else if (s.substring(0, 6) === "@media") {
    return (0, _captureMedia2.default)(o);
  } else {
    return (0, _captureStyle2.default)(o);
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = captureComment;
function captureComment(o) {
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = captureStyle;

var _IS_SPACE = __webpack_require__(9);

var _IS_SPACE2 = _interopRequireDefault(_IS_SPACE);

var _block = __webpack_require__(7);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function captureStyle(o) {
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

  result.selector = selector.replace(/\s+/g, " ").replace(/\n/g, "").split(",").map(function (a) {
    return a.trim();
  });
  result.value = (0, _block2.default)(o);
  return result;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = captureMedia;

var _IS_SPACE = __webpack_require__(9);

var _IS_SPACE2 = _interopRequireDefault(_IS_SPACE);

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function captureMedia(o) {
  var result = {
    type: "media",
    selector: [],
    value: []
  };

  var length = o.str.indexOf("{", o.index);
  var selector = "";

  o.index += 6;
  while (_IS_SPACE2.default[o.str[o.index]] && o.str[o.index]) {
    o.index += 1;
  }

  while (o.index < length) {
    selector += o.str[o.index];
    o.index += 1;
  }

  result.selector = selector.replace(/\s+/g, " ").replace(/\n/g, "").split(",").map(function (a) {
    return a.trim();
  });
  result.value = (0, _index2.default)(o);
  return result;
}

/***/ })
/******/ ])["default"];
//# sourceMappingURL=index.js.map