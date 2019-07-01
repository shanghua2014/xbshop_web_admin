import Vue from 'vue'
import { Layout,Button,Menu,Icon,Breadcrumb,Table,Row,Col,Input,Upload,Modal,Form,message, List, Popconfirm } from 'ant-design-vue';

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
Vue.component(Table.name, Table)
Vue.component(Table.Column.name, Table.Column)
Vue.component(Table.ColumnGroup.name, Table.ColumnGroup)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
Vue.component(Input.Group.name, Input.Group)
Vue.component(Input.Search.name, Input.Search)
Vue.component(Input.TextArea.name, Input.TextArea)
Vue.component(Upload.name, Upload)
Vue.component(Upload.Dragger.name, Upload.Dragger)
Vue.component(Modal.name, Modal)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(List.name, List)
Vue.component(List.Item.name, List.Item)
Vue.component(List.Item.Meta.name, List.Item.Meta)
Vue.component(Popconfirm.name, Popconfirm)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
