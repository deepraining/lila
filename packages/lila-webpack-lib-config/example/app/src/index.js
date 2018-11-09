import './style/css.css';
import './style/less.less';
import './style/scss.scss';

import base from 'base'; // eslint-disable-line
import common from 'common'; // eslint-disable-line
import './render';
import './flow';

base();
common();

console.log('test');
// console.log(hello.hi); // eslint-disable-line

console.log(__DEFINE__); // eslint-disable-line
