<template>
    <div class="hello">
        注册<br/>
        <input type="text" v-model="phone" maxlength="11" placeholder="手机号"><br>
        <input type="password" v-model="password" placeholder="密码"><br>
        <input type="password" v-model="password2" placeholder="确认密码"><br>
        <input type="text" v-model="code" maxlength=6 placeholder="验证码"><br>
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
.tac{
    text-align: center;
}
.flex{
    display: flex;
}
.wid100{
    width:100%;
}
</style>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                phone:15910277441,
                password:111111,
                password2:111111,
                code:123456
            }
        },
        methods:{
            submit () {
                let datas = {
                    phone:this.phone,
                    password:this.password,
                    password2:this.password2,
                    code:this.code
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
