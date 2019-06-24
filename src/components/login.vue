<template>
    <div>
        登录<br/>
        <input type="text" v-model="phone" maxlength=11 placeholder="手机"><br/>
        <input type="password" v-model="password" placeholder="密码"><br/>
        <div class="button" @click="submit">登录</div>
        <a href="/" class="button" >注册</a>
        <a href="#/change" class="button" >忘记密码</a>
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
            phone:15910277440,
            password:111111
        }
    },
     mounted(){
            this.axios({
                method:'post',
                url:'/api/user/getuserinfo',
                data:this.qs.stringify({uid:this.getCookie('user')})
            })
        },
    methods:{
        submit () {
            let datas = {
                    phone:this.phone,
                    password:this.password
                }
                this.axios({
                    method:'post',
                    url:'/api/user/login',
                    data:this.qs.stringify(datas)
                }).then(res => {

                });
        }
    }
}
</script>
