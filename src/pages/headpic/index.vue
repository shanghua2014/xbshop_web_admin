<template>
    <a-table :columns="columns" :dataSource="data" :rowKey="data=>data.id" bordered>
        <template slot="name" slot-scope="text">
            <span>{{text}}</span>
        </template>

        <template slot="title">
            <a-row>
                <a-col :span="2" to="">
                    <router-link to="/headpic/add">
                        <a-button type="primary" icon="plus-circle" block>添加</a-button>
                    </router-link>
                </a-col>
                <a-col :span="20"><b>{{this.$route.name}}</b></a-col>
                <a-col :span="2"></a-col>
            </a-row>
        </template>

        <span slot="picture" slot-scope="picture, record">
            <img :src="'/uploads/'+picture"  @click="info('/uploads/'+picture, record.pname)"/>
        </span>

        <template slot="operation" slot-scope="text, record, index">
            <a-popconfirm v-if="columns.length" title="确定删除?" @confirm="() => onDelete(record.id, record.picture, index)">
            <a href="javascript:;">删除</a>
            </a-popconfirm>
        </template>
    </a-table>
</template>
<script>
    const columns = [{
        title: '商品名称',
        dataIndex: 'pname',
        key: 'pname',
        scopedSlots: {
            customRender: 'pname'
        },
    }, {
        title: '商品图片',
        dataIndex: 'picture',
        key: 'picture',
        scopedSlots: {
            customRender: 'picture'
        }
    }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        scopedSlots: {
            customRender: 'operation'
        },
    }];
    let data = [];

    export default {
        data() {
            return {
                data,
                columns,
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            info(pic, pname='图片') {
                const h = this.$createElement;
                this.$success({
                    title: `${pname}-预览图`,
                    content: h('div')
                });
                const d = document.getElementsByClassName("ant-modal-confirm-content");
                d[0].innerHTML = `<img src=${pic} width="100%">`
            },
            onDelete(id, pic, index) {
                this.axios({
                    url: '/api/bootstrap/del',
                    method: 'post',
                    data: this.qs.stringify({
                        id: id,
                        pic: pic
                    }),
                }).then(res => {
                    if (res.data.code == 2000) {
                        this.data.splice(index, 1);
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
                    this.data = r.list
                });
            }
        }
    }

</script>
<style>
    .headpic .ant-row {
        margin-left: 16px;
        margin-bottom: 16px;
    }

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
