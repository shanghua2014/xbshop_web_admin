<template>
    <a-table :columns="columns" :dataSource="data" bordered>
        <template slot="gname" slot-scope="text">
            <span>{{text}}</span>
        </template>

        <template slot="title">
            <a-row>
                <a-col :span="3" to="">
                    <router-link to="/goods/add">
                        <a-button type="primary" icon="plus-circle" block>添加商品</a-button>
                    </router-link>
                </a-col>
                <a-col :span="20"><b>{{this.$route.name}}</b></a-col>
                <a-col :span="2"></a-col>
            </a-row>
        </template>

        <span slot="picture" slot-scope="picture">
            <img :src="'/uploads/'+picture" />
        </span>

        <template slot="operation" slot-scope="text, record">
            <a-popconfirm v-if="columns.length" title="Sure to delete?" @confirm="() => onDelete(record.id)">
                <a href="javascript:;">删除</a>
            </a-popconfirm>
            &nbsp;
            <router-link :to="{path:'/classify/add'}">编辑</router-link>
        </template>
    </a-table>
</template>
<script>
    const columns = [{
        title: '商品名称',
        dataIndex: 'gname',
        key:'gname',
        scopedSlots: {
            customRender: 'gname'
        },
    },{
        title: '商品图片',
        dataIndex: 'picture',
        key:'picture',
        scopedSlots: {
            customRender: 'picture'
        }
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
            console.log(columns)
            this.axios({
                method: 'post',
                url: '/api/goods/list',
                data: this.qs.stringify({
                    page:1,
                    size:2
                }),
            }).then(res => {
                if (res.data.code == 2000) {
                    this.data = res.data.result.list;
                }
            })
        },
        methods:{
            onDelete (key) {
                console.log(key)
            }
        }
    }
</script>

