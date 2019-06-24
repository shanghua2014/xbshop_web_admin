<template>
    <div>订单页</div>
    
</template>
<script>
    import {
        api
    } from '@/utils/http'

    export default {
        created() {
            this.order();
            // this.getData();
        },
        methods: {
            async getData() {
                await api.post('/api/user/orderlist',{uid:582064});
            },
            async order() {
                let d = {
                    uid: 582064,
                    pid: 15,
                    amount: 1,
                    exchangprice:10000,
                    phone:15910277440,
                    consignee:'收货人姓名',
                    address:'北京市朝阳区亮马桥',
                    pname:'产品名称',
                    picture:'',
                    type:2,
                    ntype:4
                }
                await api.post('/api/user/order',d);
            },
        }
    }

</script>
