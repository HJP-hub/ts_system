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

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
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