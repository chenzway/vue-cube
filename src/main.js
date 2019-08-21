import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入 cube-ui
import './cube-ui';
import axios from 'axios';
import './interceptors';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
