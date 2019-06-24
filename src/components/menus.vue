<template>

    <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :defaultSelectedKeys="['1']" :style="{textAlign:'left'}">
            <a-menu-item key="1">
                <a-icon type="copy" />
                <router-link to="/">
                    后台信息
                </router-link>
            </a-menu-item>

            <a-menu-item key="2">
                <a-icon type="picture" />
                <router-link to="/headpic">
                    头图管理
                </router-link>
            </a-menu-item>

            <a-sub-menu key="sub1">
                <span slot="title">
                    <a-icon type="laptop" />
                    商品管理
                </span>
                <a-menu-item key="4">
                    <router-link to="/goods/classes">
                        商品分类
                    </router-link>
                </a-menu-item>
                <a-menu-item key="5">
                    <router-link to="/goods/list">
                        商品列表
                    </router-link>
                </a-menu-item>
            </a-sub-menu>

            <a-menu-item key="6">
                <a-icon type="team" />
                <router-link to="/users">
                    用户管理
                </router-link>
            </a-menu-item>

            <a-menu-item key="7">
                <a-icon type="shopping-cart" />
                <router-link to="/orders">
                    订单管理
                </router-link>
            </a-menu-item>

            <a-menu-item key="8">
                <a-icon type="user" />
                <router-link to="/admins">
                    管理员
                </router-link>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>
<script>
    export default {


    }

</script>

<style>
    .ant-menu-item {
        cursor: default;
    }

    .ant-menu-item a {
        display: inline;
    }

</style>
