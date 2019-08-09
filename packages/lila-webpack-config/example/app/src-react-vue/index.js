import Vue from 'vue';
import App from './App.vue';
import './index.g.less';
import './render';

new Vue({
  render: h => h(App),
}).$mount('#app');
