import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs' 
import Plugin from './utils/plugin';


//定义全局变量
Vue.prototype.axios = axios;
Vue.prototype.qs = qs; 

Vue.use(Plugin);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
