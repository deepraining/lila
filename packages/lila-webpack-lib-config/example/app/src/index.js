import './style/css.css';
import './style/less.less';
import './style/scss.scss';

import Vue from 'vue';

import base from 'base'; // eslint-disable-line
import common from 'common'; // eslint-disable-line
import App from './App.vue';
import './render';
import './flow';

base();
common();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#example-2');

console.log('test');
// console.log(hello.hi); // eslint-disable-line

console.log(__DEFINE__); // eslint-disable-line
