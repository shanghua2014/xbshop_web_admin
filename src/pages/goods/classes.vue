<template>
    <a-table :columns="columns" :dataSource="data" bordered>
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
        title: '分别名称',
        dataIndex: 'cname',
        key:'cname',
        scopedSlots: {
            customRender: 'cname'
        },
    }, {
        title: '操作',
        dataIndex: 'operation',
        key:'operation',
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
            this.axios({
                method: 'post',
                url: '/api/classify/list',
                data: '',
            }).then(res => {
                if (res.data.code == 2000) {
                    this.data = res.data.result.list;
                }
            })
        },
        methods:{
            onDelete (key) {
                alert('暂不可用')
            }
        }
    }

</script>
<style>
    th.column-money,
    td.column-money {
        text-align: right !important;
    }

</style>
