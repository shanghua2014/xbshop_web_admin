<template>
    <div class="headpic">
        <a-row>
            <a-col :span="22"></a-col>
            <a-col :span="2" to="">
                <router-link to="/headpic/add">
                    <a-button type="primary" icon="plus-circle" block>添加</a-button>
                </router-link>
            </a-col>
        </a-row>
        <a-row class="titles">
            <a-col :span="2">ID</a-col>
            <a-col :span="4">标题</a-col>
            <a-col :span="14">图片</a-col>
            <a-col :span="2">操作</a-col>
        </a-row>
        <a-row v-for="(item, index) in lists" :key="index" class="list">
            <a-col :span="2">{{item.id}}</a-col>
            <a-col :span="4">{{item.title}}</a-col>
            <a-col :span="14"><img :src="'uploads/'+item.picture" :alt="item.title"/></a-col>
            <a-col :span="4">
                <a-popconfirm title="确认删除么?" @confirm="confirm(item.id, item.picture, index)" okText="Yes"
                    cancelText="No">
                    <a href="#">删除</a>
                </a-popconfirm>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                lists: '',
                isckick: true
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            confirm(id, pic, index) {
                this.axios({
                    url: '/api/bootstrap/del',
                    method: 'post',
                    data: this.qs.stringify({
                        id: id,
                        pic: pic
                    }),
                }).then(res => {
                    if (res.data.code == 2000) {
                        this.lists.splice(index, 1);
                        this.$message.success('删除成功！');
                    }
                });
            }, 
            getData() {
                this.axios({
                    url: '/api/bootstrap/list',
                    method: 'post',
                    data: this.qs.stringify({
                        page: 1,
                        size: 10,
                    }),
                    type: 'json',
                }).then(res => {
                    const r = res.data.result;
                    this.lists = r.list
                });
            }
        }
    }

</script>
<style>
    .headpic .list {
        border: 1px solid #f3f3f3;
        border-top: 0;
    }

    .headpic .list div {
        border-right: 1px solid #f3f3f3;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .headpic .list div img {
        height: 100%;
    }

    .headpic .titles {
        background: #f3f3f3;
        font-weight: bold;
        color: #666;
        padding: 16px 8px;
    }

</style>
