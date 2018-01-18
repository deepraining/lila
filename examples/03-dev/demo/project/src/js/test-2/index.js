
require('bootstrap/dist/css/bootstrap.css');
require('../../css/test/index.css');
require('../../css/test/index2.css');
require('../../css/test/index.less');

require('../test/index2')();
require('../test/index3.jsx');

require('base')();
require('common')();

console.log('test-2/index');

// test ignoreNodeModules
var Swiper = require('swiper');
require('bootstrap');