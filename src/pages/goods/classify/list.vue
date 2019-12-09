<template>
    <a-table :columns="columns" :dataSource="tableData" :rowKey="tableData => tableData.id" :pagination="pagination"
        :loading="loading" @change="handleTableChange" bordered>
        <template slot="name" slot-scope="text">
            <span>{{text}}</span>
        </template>
        <template slot="title">
            <a-row>
                <a-col :span="3" to="">
                    <router-link to="/classify/add">
                        <a-button type="primary" icon="plus-circle" block>添加分类</a-button>
                    </router-link>
                </a-col>
                <a-col :span="20"><b>{{this.$route.name}}</b></a-col>
                <a-col :span="2"></a-col>
            </a-row>
        </template>
        <template slot="operation" slot-scope="text, record">
            <a-popconfirm v-if="columns.length" title="Sure to delete?" @confirm="() => onDelete(record.id)">
                <a href="javascript:;">删除</a>
            </a-popconfirm>
            &nbsp;
            <router-link :to="{path:'/classify/add', query:{id:record.id,cname:record.cname}}">编辑</router-link>
        </template>
    </a-table>
</template>
<script>
    const columns = [{
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '分别名称',
            dataIndex: 'cname',
        }, {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {
                customRender: 'operation'
            },
        }
    ];
    let tableData = [];

    export default {
        data() {
            return {
                tableData,
                columns,
                loading: false,
                pagination: {
                    pageSize: 3,
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
            onDelete(key) {
                alert('暂不可用')
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
                    url: '/api/classify/list',
                    data: {
                        size: this.pagination.pageSize,
                        ...params,
                    },
                }).then(res => {
                    let r = res.data;
                    if (r.code == 2000) {
                        const pagination = {
                            ...this.pagination
                        };
                        this.tableData = r.result.list;
                        this.pagination = pagination;
                        pagination.total = r.result.maxtotal
                    } else {
                        alert(r.msg)
                    }
                    this.loading = false;
                })
            },
        }
    }

</script>
<style>
    th.column-money,
    td.column-money {
        text-align: right !important;
    }

</style>
