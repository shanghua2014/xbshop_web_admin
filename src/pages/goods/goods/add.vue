<template>
    <a-form :form="form" @submit="handleSubmit">
        <a-row>
            <a-col :span="20"><b>{{this.$route.name}}</b></a-col>
        </a-row>
        <br>
        <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 3 }" :validate-status="selectStatus" label="所属分类">
            <a-select :defaultValue="classDefault" style="width: 120px" @change="selectHandleChange" :loading="loading">
                <a-select-option v-for="item in classifyData" :key="item.id" :value="item.id">{{item.cname}}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 6 }" label="商品名称">
            <a-input v-decorator="['goodsName',{rules: [{ required: true, message: '请输入商品名称' }]}]"
                placeholder="请输入商品名称" />
        </a-form-item>
        <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 6 }" label="专柜价">
            <a-input v-decorator="['goodPrice',{rules: [{ required: true, message: '请输入专柜价' }]}]" placeholder="专柜价：￥00.00" />
        </a-form-item>
        <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 6 }" label="兑换价">
            <a-input v-decorator="['goodEprice',{rules: [{ required: true, message: '请输入兑换价' }]}]" placeholder="兑换价：￥00.00" />
        </a-form-item>
        <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 6 }" label="闯关价">
            <a-input v-decorator="['goodRprice',{rules: [{ required: true, message: '请输入闯关价' }]}]" placeholder="闯关价：￥00.00" />
        </a-form-item>

        <a-form-item v-if="goodImg" :label-col="{ span: 3 }" :wrapper-col="{ span: 6 }" label="当前图片：">
            <img :src="goodImg" alt="" />
        </a-form-item>

        <a-form-item label="上传图片" :label-col="{ span: 3 }" :wrapper-col="{ span: 6 }">
            <div class="clearfix">
                <a-upload action="/api/upload/img" listType="picture-card" :fileList="fileList" @preview="handlePreview"
                    @change="imageHandleChange">
                    <div v-if="fileList.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">点击上传</div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </div>
        </a-form-item>

        <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }" label="产品描述">
            <a-textarea v-decorator="['goodInfo',{rules: [{ required: true, message: '请输入产品信息' }]}]" placeholder="请输入产品信息" :autosize="{ minRows: 4, maxRows: 8 }" />
        </a-form-item>

        <a-form-item :wrapper-col="{span: 4,offset: 3}" class="row-flex row-flex-space-around row-flex-middle">
            <a-button type="primary" @click="cancel" style="margin-right:10px">
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
                gname: this.$route.query.gname ? this.$route.query.gname : '',
                form: this.$form.createForm(this),
                cid:'',
                previewVisible: false,
                previewImage: '',
                imgName: '', // 后端返回的图片名称
                fileList: [],
                price: this.$route.query.price,
                eprice: this.$route.query.eprice,
                rprice: this.$route.query.rprice,
                goodImg: '',    // 产品预览图
                goodInfo: '',
                desc: this.$route.query.desc ? this.$route.query.desc : '',
                loading: true,
                classDefault:this.$route.query.classify ? decodeURI(this.$route.query.classify) : '请选择分类',
                classifyData:'',
                selectStatus:''
            };
        },
        mounted() {
            if (this.id && this.gname) {
                this.URLArgmentsHandle()
            }
            this.getClassify()
        },
        methods: {
            selectHandleChange(value) {
                this.cid = value;
                this.selectStatus = '';
            },
            // 获取分类
            getClassify() {
                this.axios({
                    method: 'post',
                    url: '/api/classify/list',
                    data: '',
                }).then( res => {
                    this.loading = false;
                    this.classifyData = res.data.result.list;
                })
            },
            // url传参处理
            URLArgmentsHandle() {
                this.gname = decodeURI(this.gname);
                this.goodImg = '/uploads/' + decodeURI(this.$route.query.img);
                this.price = this.price.substr(1, this.price.length);
                this.eprice = this.eprice.substr(1, this.eprice.length);
                this.rprice = this.rprice.substr(1, this.rprice.length);
                this.form.setFieldsValue({
                    goodsName: decodeURI(this.gname),
                    goodPrice: this.price,
                    goodEprice: this.eprice,
                    goodRprice: this.rprice
                });
                if (this.desc) {
                    this.form.setFieldsValue({
                        goodInfo: decodeURI(this.desc)
                    });
                }
            },
            // 表单提交
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!this.id && !this.cid) {
                        this.$message.success('请选择分类');
                        this.selectStatus = 'error';
                        return;
                    }
                    
                    let submitData = {
                        id:this.id
                    }
                    if (this.id) {
                        this.gname!=values.goodsName ? submitData.gname = values.goodsName : '';
                        this.price!=values.goodPrice ? submitData.price = values.goodPrice : '';
                        this.eprice!=values.goodEprice ? submitData.eprice = values.goodEprice : '';
                        this.rprice!=values.goodRprice ? submitData.rprice = values.goodRprice : '';
                        this.cid ? submitData.cid = this.cid : '';
                        this.desc != values.goodInfo ? submitData.desc = values.goodInfo : submitData.desc == this.desc;
                        this.imgName && this.goodImg!=this.imgName ? submitData.oldpic = this.goodImg :  '';
                    } else {
                        this.gname = submitData.gname = values.goodsName;
                        this.price = submitData.price = values.goodPrice;
                        this.eprice = submitData.eprice = values.goodEprice;
                        this.rprice = submitData.rprice = values.goodRprice;
                        this.desc = submitData.desc = values.goodInfo;
                        submitData.cid = this.cid;
                    }
    
                    if (!this.gname || !this.price || !this.eprice || !this.rprice) {
                        return;
                    }

                    this.imgName ? submitData.pic = this.imgName : '';

                    if (this.id && this.gname) {
                        if (Object.keys(submitData).length==1) {
                            this.$message.warning('您未做任何修改')
                            return;
                        }

                        // 修改分类
                        this.axios({
                            method: 'post',
                            url: '/api/goods/update',
                            data: this.qs.stringify(submitData)
                        }).then(res => {
                            if (res.data.code == 2000) {
                                this.$router.push({
                                    path: '/goods/list'
                                })
                            }
                        })
                    } else {
                        if (!this.imgName) {
                            this.$message.success('请上传图片', 3);
                            return;
                        }
                        if (!submitData.desc) {
                            return;
                        }

                        // 添加分类
                        this.axios({
                            method: 'post',
                            url: '/api/goods/add',
                            data: this.qs.stringify(submitData)
                        }).then(res => {
                            if (res.data.code == 2000) {
                                this.$router.push({
                                    path: '/goods/list'
                                })
                            }
                        })
                    }
                });
            },
            cancel() {
                this.$router.go(-1)
            },

            /** ---------- 图片上传 ---------- **/
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
            imageHandleChange({
                fileList
            }) {
                // 获取图片 -> 上传图片 -> 示预览
                this.fileList = fileList
                if (!this.imgName) this.imgName = fileList[0].response ? fileList[0].response.img : '';
            }
            /** ---------- 图片上传 OVER---------- **/
        }
    };

</script>
<style>
    .ant-form-item-control img {
        max-width: 100px;
        float: left;
    }
</style>
