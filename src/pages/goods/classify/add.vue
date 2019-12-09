<template>
    <a-form :form="form" @submit="handleSubmit">
        <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }" label="分类名称">
            <a-input v-decorator="['classifyName',{rules: [{ required: true, message: '请输入分类名称' }]}]" placeholder="请输入分类名称" />
        </a-form-item>

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
        mounted() {
            if (this.id && this.cname) {
                this.form.setFieldsValue({
                    classifyName: this.cname
                })
            }
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
                                    cname: values.classifyName
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
                                    cname: values.classifyName
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
