/*!
 * preserve comments
 */



require('bootstrap/dist/css/bootstrap.css');
require('../../css/test/index.css');
require('../../css/test/index2.css');
require('../../css/test/index.less');

require('./index2')();
require('./index3.jsx');

require('base')();
require('common')();

console.log('test/index');

// test ignoreNodeModules
var Swiper = require('swiper');
require('bootstrap');