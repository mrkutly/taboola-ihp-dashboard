module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/analysis/index.tsx":
/*!**********************************!*\
  !*** ./pages/analysis/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Adapter */ "./utils/Adapter.ts");
var _jsxFileName = "/Users/mark.sauer.utley/Development/ihp/client/pages/analysis/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Analysis = () => {
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: analysisData,
    1: setAnalysisData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: dateRange,
    1: setDateRange
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    async function getData() {
      try {
        const data = await _utils_Adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getShortAnalysis(1010748); // eslint-disable-next-line @typescript-eslint/camelcase

        const {
          json_response,
          daterange
        } = data.data[0];
        setAnalysisData(json_response);
        setDateRange(daterange);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    }

    getData();
  }, []);
  if (loading) return __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: undefined
  }, "loading...");
  if (error) return __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  }, "error ", error.message);
  const mappedData = analysisData.map(datum => {
    // console.log(datum);
    return __jsx("div", {
      key: datum.MODE,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: undefined
    }, datum.MODE);
  });
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }, dateRange), mappedData);
};

/* harmony default export */ __webpack_exports__["default"] = (Analysis);

/***/ }),

/***/ "./utils/Adapter.ts":
/*!**************************!*\
  !*** ./utils/Adapter.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const headers = {
  Accepts: 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
};
const Adapter = {
  async getPublisherStats(publisher) {
    try {
      const res = await fetch(`${"http://localhost:5000/api/v1"}/dataframe_stats?publisher=${publisher}`, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },

  async getPublisherAnalysisJson(publisher) {
    try {
      const res = await fetch(`${"http://localhost:5000/api/v1"}/data_json?publisher=${publisher}`, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },

  async getShortAnalysis(publisherId) {
    try {
      const res = await fetch(`${"http://localhost:5000/api/v1"}/impl-short-pv-reader?publisher=${publisherId}`, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },

  async getLongAnalysis(publisherId) {
    try {
      const res = await fetch(`${"http://localhost:5000/api/v1"}/impl-pv-reader?publisher=${publisherId}`, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },

  async getModes(publisherId) {
    try {
      const res = await fetch(`${"http://localhost:5000/api/v1"}/impl-list-modes?publisher=${publisherId}`, {
        method: 'GET',
        headers
      });
      return res.json();
    } catch (error) {
      return error;
    }
  }

};
/* harmony default export */ __webpack_exports__["default"] = (Adapter);

/***/ }),

/***/ 3:
/*!****************************************!*\
  !*** multi ./pages/analysis/index.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mark.sauer.utley/Development/ihp/client/pages/analysis/index.tsx */"./pages/analysis/index.tsx");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=analysis.js.map