import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import './plugins/element.js'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

axios.defaults.baseURL = 'http://172.16.61.166:8080/api';
/**
 * 请求拦截
 */
axios.interceptors.request.use(
    // 在发送请求之前做些什么
    config => {
      let token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    // 对请求错误做些什么
    error => {
      return Promise.reject(error);
    }) ;