webpackJsonp([0,2],{

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {


module.exports = function (_) {
    console.log('test-5/index/js/b');
};

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {


var b = __webpack_require__(3);

module.exports = function (_) {
    b();

    console.log('test-5/index/js/c');
};

/***/ })

});
