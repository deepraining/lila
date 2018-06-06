/*!
 * preserve comments
 */



require('bootstrap/dist/css/bootstrap.css');
require('../../test/index/css/index.css');
require('../../test/index/css/index2.css');
require('../../test/index/css/index.less');

require('../../test/index/js/index2')();
require('../../test/index/js/index3.jsx');

require('base')();
require('common')();

console.log('test-2/index');

// test ignoreNodeModules
const Swiper = require('swiper');
require('bootstrap');
