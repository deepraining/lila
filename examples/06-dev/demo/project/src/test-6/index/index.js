/*!
 * preserve comments
 */

require('bootstrap/dist/css/bootstrap.css');
require('./css/index.less');
require('./css/index.css');
require('./css/index2.css');

require('./js/index2')();
require('./js/index3.jsx');

require('base')();
require('common')();

require('out')();
require('out-2')();

console.log('test/index');

/* eslint no-unused-vars: 0 */
const Swiper = require('swiper');
require('bootstrap');

const $ = require('jquery');

$.get('/src/test/index/data/index/?key1=value1&key2=value2', {}, res => {
  console.log("get['/src/test/index/data/index']", res);
});
