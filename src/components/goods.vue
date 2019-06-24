<template>
    <div>
        {{$route.name}}<br />
        <div class="wid100 classify tal">
            分类：
            <span v-for="(item,$i) in classify.result" :key="$i">
                {{item.cname}}
            </span>
        </div>
        <div class="shop flex">
            <div class="list flex">
                <a href="#/" class="img">暂无图片</a>
                <div>标题</div>
                <div>专柜价</div>
                <div class="btns flex">
                    <button>花费20鑫币闯获得产品</button>
                    <button>鑫币兑换</button>
                </div>
            </div>
            <div class="list flex">
                <div class="img">暂无图片</div>
                <div>标题</div>
                <div>专柜价</div>
                <div class="btns flex">
                    <button>花费20鑫币闯获得产品</button>
                    <button>鑫币兑换</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .classify {
        border: 1px solid #333;
        text-align: left;
    }
    .classify span{
            border-right:1px solid;
        }

    .flex {
        display: flex;
    }

    .shop {
        display: flex;
        /* flex-direction: column; */
        border: 1px solid #ccc;
        justify-content: space-evenly;
        padding: 0 2%;
    }

    .shop .list {
        width: 46%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 4%;
    }

    .shop .img {
        width: 100%;
        height: 140px;
        background: #eee;
    }

    .btns {
        flex-direction: row;
    }

    button {
        border: 1px solid red;
        background: #eee;
        color: red;
    }

</style>
<script>
    import {
        api
    } from '@/utils/http'
    export default {
        data() {
            return {
                lists: '',
                classify: '',
                datas : {
                    page: 3,
                    size: 5
                }
            }
        },
        created() {
            this.getData()
        },
        methods: {
            async getData() {
                this.classify = await api.post('/api/goods/classify');
                let cid = this.classify.result[0].id;
                if (this.classify) {
                    this.datas.cid = cid;
                    this.lists = await api.post('/api/goods/list', this.datas);
                }
            }
        }
    }

</script>
