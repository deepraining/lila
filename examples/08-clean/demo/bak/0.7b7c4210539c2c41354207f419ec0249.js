webpackJsonp([0,2],{

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (_) {
    console.log('test-5/index/js/b');
};

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var b = __webpack_require__(3);

module.exports = function (_) {
    b();

    console.log('test-5/index/js/c');
};

/***/ })

});