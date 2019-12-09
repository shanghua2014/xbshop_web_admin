import Vue from 'vue'
import { Layout,Button,Menu,Icon,Breadcrumb,Table,Row,Col,Input,Upload,Modal,Form,message, List, Popconfirm, Tag, Select } from 'ant-design-vue';

import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Plugin from './utils/plugin';

//定义全局变量
Vue.prototype.axios = axios;
Vue.prototype.qs = qs; 
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;

Vue.use(Plugin);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Menu);
Vue.use(Table);
Vue.use(Breadcrumb);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Upload);
Vue.use(Form);
Vue.use(Modal);
Vue.use(List);
Vue.use(Popconfirm);
Vue.use(Tag);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
