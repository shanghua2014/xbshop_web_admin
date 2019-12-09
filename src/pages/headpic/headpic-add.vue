<template slot="title">
    <a-form :form="form" @submit="handleSubmit">

        <br>

        <div class="components-input-demo-presuffix">
            <a-form-item label="请输入标题" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
                <a-input v-model="title" placeholder="标题" ref="titleInput">
                    <a-icon slot="prefix" type="highlight" />
                    <a-icon v-if="title" slot="suffix" type="close-circle" />
                </a-input>
            </a-form-item>
        </div>

        <br>

        <a-form-item label="上传图片" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
            <div class="clearfix">
                <a-upload action="/api/upload/img" listType="picture-card" :fileList="fileList" @preview="handlePreview"
                    @change="handleChange">
                    <div v-if="fileList.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </div>
        </a-form-item>

        <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-button type="primary" html-type="submit">
                Submit
            </a-button>
        </a-form-item>
    </a-form>
</template>
<script>
    export default {
        data() {
            return {
                form: this.$form.createForm(this),
                title: '',
                link: '',
                previewVisible: false,
                previewImage: '',
                imgName: '', // 后端返回的图片名称
                fileList: [],
            }
        },
        methods: {
            // 提交表单
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!this.imgName) {
                        this.$message.success('请上传图片', 3);
                        return;
                    }
                    this.axios({
                        method: 'post',
                        url: '/api/bootstrap/add',
                        data: this.qs.stringify({
                            title: this.title,
                            pic: this.imgName
                        })
                    }).then(res => {
                        if (res.data.code == 2000) {
                            this.imgName = '';
                            this.$router.push({path:'/headpic'});
                        }
                    })
                });
            },
            emitEmpty() {
                this.$refs.titleInput.focus()
                this.title = ''
            },
            handleCancel() {
                this.previewVisible = false
            },
            handlePreview(file) {
                console.log('handlePreview')
                this.previewImage = file.url || file.thumbUrl
                this.previewVisible = true
            },
            // 上传图片返回信息
            handleChange({
                fileList
            }) {
                // 获取图片 -> 上传图片 -> 示预览
                this.fileList = fileList
                if (!this.imgName) this.imgName = fileList[0].response ? fileList[0].response.img : '';

                // 删除图片
                if (this.imgName && !this.fileList.length) {
                    console.log('删除图片');
                    this.axios({
                        method: 'post',
                        url: '/api/upload/imgdel',
                        data: this.qs.stringify({
                            pic: this.imgName
                        })
                    }).then(res => {
                        if (res.data.code == 2000) this.imgName = '';
                    })
                }
            },
        },
    }

</script>
<style>
    .ant-modal-close-x {
        width: 32px;
        height: 32px;
        line-height: 32px;
    }

    .ant-upload.ant-upload-select-picture-card {
        width: 70px;
        height: 70px;
    }

    .components-input-demo-presuffix .anticon-close-circle {
        cursor: pointer;
        color: #ccc;
        transition: color 0.3s;
        font-size: 12px;
    }

    .components-input-demo-presuffix .anticon-close-circle:hover {
        color: #999;
    }

    .components-input-demo-presuffix .anticon-close-circle:active {
        color: #666;
    }

    /* you can make up upload button and sample style by using stylesheets */
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }

</style>
