<template>
    <a-form :form="form" @submit="handleSubmit">
        <a-row>
            <a-col :span="20"><b>{{this.$route.name}}</b></a-col>
        </a-row>
        <br>
        <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }" label="商品名称">
            <a-input v-decorator="['cname',{rules: [{ required: true, message: '请输入商品名称' }]}]" placeholder="请输入商品名称" />
        </a-form-item>
        <input type="hidden" v-model="id">

        <a-form-item :wrapper-col="{span: 2,offset: 2}" class="row-flex row-flex-space-around row-flex-middle">
            <a-button type="primary" @click="cancel">
                取消
            </a-button>
            <a-button type="primary" html-type="submit" v-if="!id">
                添加
            </a-button>
            <a-button type="primary" html-type="submit" v-if="id">
                修改
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.query.id ? this.$route.query.id : '',
                cname: this.$route.query.cname ? this.$route.query.cname : '',
                form: this.$form.createForm(this),
            };
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (err) {
                        console.error('请输入分类名称');
                    } else {
                        if (this.id && this.cname) {
                            // 修改分类
                            this.axios({
                                method: 'post',
                                url: '/api/classify/update',
                                data: this.qs.stringify({
                                    id: this.id,
                                    cname: values.cname
                                })
                            }).then(res => {
                                if (res.data.code == 2000) {
                                    this.$router.push({
                                        path: '/classify/list'
                                    })
                                }
                            })
                        } else {
                            // 添加分类
                            this.axios({
                                method: 'post',
                                url: '/api/classify/add',
                                data: this.qs.stringify({
                                    cname: values.cname
                                }),
                            }).then(res => {
                                if (res.data.code == 2000) {
                                    this.$router.push({
                                        path: '/classify/list'
                                    })
                                }
                            })

                        }

                    }
                });
                return;
            },
            cancel() {
                this.$router.go(-1)
            }
        }
    };

</script>
