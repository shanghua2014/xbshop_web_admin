<template>
    <div>
        修改密码<br />
        <input type="text" v-model="phone" maxlength=11 placeholder="手机"><br />
        <input type="password" v-model="password" placeholder="新密码"><br />
        <input type="password" v-model="password2" placeholder="确认新密码"><br />
        <input type="txt" v-model="code" placeholder="验证码">验证码<br />
        <div class="button" @click="submit">确定</div>
        <a href="/" class="button">注册</a>
        <a href="#/login" class="button">登录</a>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                phone: 15910277441,
                password: 111111,
                password2: 111111,
                code: 123456
            }
        },
        methods: {
            submit() {
                let datas = {
                    phone: this.phone,
                    password: this.password,
                    password2: this.password2,
                    code:this.code
                }
                this.axios({
                    method: 'post',
                    url: '/api/changpwd',
                    data: this.qs.stringify(datas)
                }).then(res => {

                });
            }
        }
    }

</script>
