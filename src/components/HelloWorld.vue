<template>
    <div class="hello">
        <input type="text" v-model="phone" maxlength="11" placeholder="手机号"><br>
        <input type="password" v-model="password" placeholder="密码"><br>
        <input type="password" v-model="password2" placeholder="确认密码"><br>
        <div class="button" @click="submit">注册</div>
        <a href="#/login" class="button">登录</a>
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
        name: 'HelloWorld',
        data() {
            return {
                phone:'',
                password:'',
                password2:''
            }
        },
        methods:{
            submit () {
                let datas = {
                    phone:this.phone,
                    password:this.password,
                    password2:this.password2,
                }
                this.axios({
                    method:'post',
                    url:'/api/register',
                    data:this.qs.stringify(datas)
                }).then(res => {

                });
            }
        }
    }

</script>
