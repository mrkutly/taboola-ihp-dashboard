webpackHotUpdate("static/development/pages/analysis.js",{

/***/ "./pages/analysis/index.tsx":
/*!**********************************!*\
  !*** ./pages/analysis/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_Adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Adapter */ "./utils/Adapter.ts");


var _jsxFileName = "/Users/mark.sauer.utley/Development/ihp/client/pages/analysis/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;



var Analysis = function Analysis() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(true),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(null),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(null),
      analysisData = _useState3[0],
      setAnalysisData = _useState3[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    function getData() {
      return _getData.apply(this, arguments);
    }

    function _getData() {
      _getData = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var data;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _utils_Adapter__WEBPACK_IMPORTED_MODULE_3__["default"].getShortAnalysis(1010748);

              case 3:
                data = _context.sent;
                setAnalysisData(data.data[0].json_response);
                setLoading(false);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                setError(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));
      return _getData.apply(this, arguments);
    }

    getData();
  }, []);
  if (loading) return __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, "loading...");
  if (error) return __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "error ", error.message);
  var mappedData = analysisData.map(function (datum) {
    console.log(datum);
    return __jsx("div", {
      key: datum.MODE,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }, datum.MODE);
  });
  return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, mappedData);
};

/* harmony default export */ __webpack_exports__["default"] = (Analysis);

/***/ })

})
//# sourceMappingURL=analysis.js.1d1fe099617e8446f6c0.hot-update.js.map