<template>
    <div>
        <input type="text" v-model="phone" maxlength=11 placeholder="手机"><br/>
        <input type="password" v-model="password" placeholder="密码"><br/>
        <div class="button" @click="submit">登录</div>
        <a href="/" class="button" >注册</a>
    </div>
</template>
<style>
input{
    border:1px solid;
}
.button{
    border:1px solid red;
}
</style>
<script>
export default {
    data() {
        return {
            phone:'',
            password:''
        }
    },
     mounted(){
            // this.axios({
            //     method:'post',
            //     url:'/api/getuserinfo',
            //     data:this.qs.stringify({uid:this.getCookie('user')})
            // })
        },
    methods:{
        submit () {
            let datas = {
                    phone:this.phone,
                    password:this.password
                }
                this.axios({
                    method:'post',
                    url:'/api/login',
                    data:this.qs.stringify(datas)
                }).then(res => {

                });
        }
    }
}
</script>
