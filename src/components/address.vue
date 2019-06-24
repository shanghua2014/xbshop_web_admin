<template>
    <div>
        添加收货地址<br/>
        省<input type="text"><br/>
        市<input type="text"><br/>
        详情地址<input type="text"><br/>
        <div style="border:1px solid red" @click="submit">确认</div>
    </div>
</template>
<script>
import {api} from '@/utils/http'
export default {
    data() {
        return {
            datas:{
                uid:582064,
                province:'北京省',
                city:'北京市',
                area:'朝阳区',
                street:'亮马桥'
            }
        }
    },
    created() {
        // this.submit();
        // this.getData();
        // this.delete();
    },
    methods:{
        async submit () {
            await api.post('/api/user/addressjoin', this.datas);
        },
        async getData() {
            await api.post('/api/user/addresslist', this.datas);
        },
        async delete() {
            await api.post('/api/user/addressdel', {id:5});
        }
    }
}
</script>