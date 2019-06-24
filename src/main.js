import Vue from 'vue'
import { Layout,Button,Menu,Icon,Breadcrumb } from 'ant-design-vue';

import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Plugin from './utils/plugin';

//定义全局变量
Vue.prototype.axios = axios;
Vue.prototype.qs = qs; 

Vue.use(Plugin);

Vue.config.productionTip = false;

Vue.component(Layout.name, Layout);
Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Menu.Divider.name, Menu.Divider)
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
