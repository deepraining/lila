/*!
 * preserve comments
 */



// require('bootstrap/dist/css/bootstrap.css');
require('./css/index.less');
require('./css/index.css');
require('./css/index2.css');

require('./js/index2')();
require('./js/index3.jsx');

require('base')();
require('common')();

console.log('test/index');

// test ignoreNodeModules
var Swiper = require('swiper');
require('bootstrap');