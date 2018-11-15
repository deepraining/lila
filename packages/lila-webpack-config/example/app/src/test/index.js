import 'bootstrap/dist/css/bootstrap.css';
import './css.css';
import './less.less';
import './scss.scss';

import base from 'base'; // eslint-disable-line
import common from 'common'; // eslint-disable-line
import '../jsx/render';
import './flow';

base();
common();

console.log('test');
// console.log(hello.hi); // eslint-disable-line

console.log(__DEFINE__); // eslint-disable-line
