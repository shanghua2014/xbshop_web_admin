<template>
    <a-layout id="components-layout-demo-top-side-2">
        <a-layout-header class="header">
            <div class="logo" />
        </a-layout-header>

        <a-layout>
            <Menus></Menus>

            <a-layout style="padding: 0 24px 24px">
                <a-breadcrumb style="text-align:left;margin: 16px 0">
                    <a-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">{{item.name}}</a-breadcrumb-item>
                    <!-- <a-breadcrumb-item>List</a-breadcrumb-item> -->
                    <!-- <a-breadcrumb-item>App</a-breadcrumb-item> -->
                </a-breadcrumb>
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <router-view></router-view>
                </a-layout-content>
            </a-layout>
        </a-layout>

    </a-layout>
</template>
<script>
    import Menus from '@/components/menus'
    export default {
        components: {
            Menus
        }
    }

</script>

<style>
    #components-layout-demo-top-side-2 .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, .2);
        margin: 16px 28px 16px 0;
        float: left;
    }

</style>
