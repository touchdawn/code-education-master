import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
// import axios from "./utils/request/request.js";
Vue.use(uView);
Vue.config.productionTip = false
// Vue.prototype.$axios = axios

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
