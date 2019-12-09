<template>
    <a-table :columns="columns" :dataSource="tableData" :rowKey="(tableData, index) => index" :pagination="pagination"
        :loading="loading" @change="handleTableChange" bordered>
        <template slot="gname" slot-scope="text">
            <span>{{text}}</span>
        </template>

        <template slot="title">
            <a-row>
                <a-col :span="3">
                    <router-link to="/goods/add">
                        <a-button type="primary" icon="plus-circle" block>添加商品</a-button>
                    </router-link>
                </a-col>
                <a-col :span="20"><b>{{this.$route.name}}</b></a-col>
                <a-col :span="2"></a-col>
            </a-row>
        </template>

        <span slot="picture" slot-scope="picture, record">
            <img :src="'/uploads/'+picture" @click="info('/uploads/'+picture, record.gname)" />
        </span>

        <template slot="operation" slot-scope="text, record">
            <a-popconfirm v-if="columns.length" title="Sure to delete?"
                @confirm="() => onDelete(record.id, record.picture)">
                <a href="javascript:;">删除</a>
            </a-popconfirm>
            &nbsp;
            <router-link
                :to="{path:'/goods/add', query:{id:record.id,gname:encodeURI(record.gname),classify:encodeURI(record.classify),price:record.price,eprice:record.exchangprice,rprice:record.rechargeprice,img:encodeURI(record.picture),desc:encodeURI(record.description)}}">
                编辑</router-link>
        </template>
    </a-table>
</template>
<script>
    const columns = [{
        title: 'ID',
        dataIndex: 'id'
    }, {
        title: '商品名称',
        dataIndex: 'gname'
    }, {
        title: '所属分类',
        dataIndex: 'classify'
    }, {
        title: '商品图片',
        dataIndex: 'picture',
        scopedSlots: {
            customRender: 'picture'
        }
    }, {
        title: '专柜价',
        dataIndex: 'price'
    }, {
        title: '兑换价',
        dataIndex: 'exchangprice'
    }, {
        title: '闯关价',
        dataIndex: 'rechargeprice'
    }, {
        title: '简介',
        dataIndex: 'description'
    }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: {
            customRender: 'operation'
        },
    }];
    let tableData = [];

    export default {
        data() {
            return {
                tableData,
                columns,
                loading: false,
                classifyData: '',
                pagination: {
                    pageSize: 5,
                    showSizeChanger: true, // 显示可改变每页数量
                    pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
                    onShowSizeChange: (current, pageSize) => this.pagination.pageSize =
                        pageSize // this.pageSize = pageSize // 改变每页数量时更新显示
                }
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            info(pic, gname) {
                const h = this.$createElement;
                this.$success({
                    title: `${gname}-预览图`,
                    content: h('div')
                });
                const d = document.getElementsByClassName("ant-modal-confirm-content");
                d[0].innerHTML = `<img src=${pic} width="100%">`
            },
            // 删除商品
            onDelete(id, pic) {
                this.tableData = this.tableData.filter(item => item.id !== id);
                this.axios({
                    method: 'post',
                    url: '/api/goods/del',
                    data: {
                        id: id,
                        picture: pic
                    }
                }).then(res => {
                    if (res.data.code == 2000) {
                        this.$message.success(res.data.msg);
                    }
                });
            },
            // 动态分页
            handleTableChange(pagination, filters, sorter) {
                const pager = {
                    ...this.pagination
                };
                pager.current = pagination.current;
                this.pagination = pager;
                this.fetch({
                    size: pagination.pageSize,
                    page: pagination.current,
                    ...filters,
                    sortField: sorter.field,
                    sortOrder: sorter.order,
                });
            },
            fetch(params = {}) {
                this.loading = true;
                this.axios({
                    method: 'post',
                    url: '/api/goods/list',
                    data: {
                        size: this.pagination.pageSize,
                        ...params,
                    },
                }).then(res => {
                    let r = res.data;
                    let list = r.result.list;
                    if (r.code == 2000) {
                        const pagination = {
                            ...this.pagination
                        };
                        for (var i in list) {
                            list[i].price = this.$formatMoney(list[i].price)
                            list[i].exchangprice = this.$formatMoney(list[i].exchangprice)
                            list[i].rechargeprice = this.$formatMoney(list[i].rechargeprice)
                        }
                        this.tableData = r.result.list;
                        this.pagination = pagination;
                        pagination.total = r.result.maxtotal
                    } else {
                        this.$error.success(r.msg);
                    }
                    this.loading = false;
                })
            }
        }
    }

</script>
<style>
.ant-table-tbody img {
    max-width: 100px;
}
.ant-modal-confirm-body .ant-modal-confirm-content {
    margin-left:0;
}
.ant-modal-confirm .ant-modal-body{
    padding:10px;
}
</style>
