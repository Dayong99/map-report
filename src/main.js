import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router'
import './plugins/element.js';
import Axios from 'axios';

Vue.config.productionTip = false;

Axios.defaults.baseURL = 'http://192.168.1.2:8301/convection/v2/api-docs'

Vue.prototype.axios = Axios

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
