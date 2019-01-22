import 'bootstrap/dist/css/bootstrap.css';
// import 'antd/lib/style/index.css';
import './css.css';
import './less.less';
import './scss.scss';

import Vue from 'vue';

// eslint-disable-next-line no-unused-vars
import { Button as Button1 } from 'antd';
// eslint-disable-next-line no-unused-vars
import { Button as Button2 } from 'antd-mobile';
// eslint-disable-next-line no-unused-vars
import { Button as Button3 } from 'element-ui';
// eslint-disable-next-line no-unused-vars
import { Button as Button4 } from 'mint-ui';

import base from 'base'; // eslint-disable-line
import common from 'common'; // eslint-disable-line
import App from '../vue/App.vue';
import '../jsx/render';
import './flow';

console.log('antd button', Button1);
console.log('antd-mobile button', Button2);
console.log('element-ui button', Button3);
console.log('mint-ui button', Button4);

base();
common();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#example-2');

console.log('test');
// console.log(hello.hi); // eslint-disable-line

console.log(__DEFINE__); // eslint-disable-line
