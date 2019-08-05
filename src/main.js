// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/style/reset.css'
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
import moment from 'moment'
import axios from 'axios'
// 设置 axios 请求基地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 创建全局过滤器
Vue.filter('formatTime', (v,parent="YYYY-MM-DD HH:mm:ss") => {
  return moment(v).format(parent)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(App),
  router
})
