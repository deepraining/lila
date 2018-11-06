import 'bootstrap/dist/css/bootstrap.css';
import './css.css';
import './less.less';
import './scss.scss';

import $ from 'jquery';
import base from 'base'; // eslint-disable-line
import common from 'common'; // eslint-disable-line
import './render';

base();
common();

console.log('test');

$.get('/src/test/mock/?key1=value1&key2=value2', {}, res => {
  console.log("get['/src/test/mock']", res);
});
