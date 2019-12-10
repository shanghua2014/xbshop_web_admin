import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Dashboard from '@/pages/dashboard/dashboard'
import Login from '@/components/login'
import ChangePhone from '@/components/changePhone'
import address from '@/components/address'
import order from '@/components/order'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '首页',
            component: Index,
            children: [
                {
                    path: '/',
                    component: Dashboard,
                    name:'后台信息'
                },
                {
                    path: '/headpic',
                    component: resolve => require(['@/pages/headpic/index'], resolve),
                    name: '头图管理'
                },
                {
                    path: '/headpic/add',
                    component: resolve => require(['@/pages/headpic/headpic-add'], resolve),
                    name: '头图管理 - 添加图片'
                },
                {
                    path: '/goods',
                    name: '商品管理',
                    component: resolve => require(['@/pages/goods/index'], resolve),
                    children: [
                        {
                            path: '/classify/list',
                            name:'商品分类',
                            component: resolve => require(['@/pages/goods/classify/list'], resolve),
                        },
                        {
                            path: '/classify/add',
                            name:'添加商品分类',
                            component: resolve => require(['@/pages/goods/classify/add'], resolve),
                        },
                        {
                            path: '/goods/list',
                            name:'商品列表',
                            component: resolve => require(['@/pages/goods/goods/list'], resolve),
                        },
                        {
                            path: '/goods/add',
                            name:'添加商品',
                            component: resolve => require(['@/pages/goods/goods/add'], resolve),
                        },
                    ]
                },
                {
                    path: '/orders',
                    component: resolve => require(['@/pages/orders/orders'], resolve),
                    name: '订单管理'
                },
                {
                    path: '/users',
                    component: resolve => require(['@/pages/users/list'], resolve),
                    name: '用户管理'
                },
                {
                    path: '/admins',
                    component: resolve => require(['@/pages/admins/admins'], resolve),
                    name: '管理员列表'
                }
            ]
        },
        
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/change',
            name: 'ChangePhone',
            component: ChangePhone
        },

        {
            path: '/address',
            name: 'address',
            component: address
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
    ]
})
