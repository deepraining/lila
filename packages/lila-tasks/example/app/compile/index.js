/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css';
import './inner/less.less';
import './inner/scss.scss';

import Vue from 'vue';

import App from './App.vue';
import './jsx/render';
import './inner/flow';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#example-2');

export default {};
