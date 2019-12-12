<template>
    <Main>
        <template>
            <div class="screen">
                <el-carousel :interval="4000" type="card" height="400px">
                    <el-carousel-item v-for="item_src in img_url">
                        <el-image :src="item_src" class="img_item"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="all_fun">
                <el-badge class="route_item">
                    <el-button size="large">填写申请表</el-button>
                </el-badge>
                <el-badge :value=12 class="route_item">
                    <el-button size="large">待提交</el-button>
                </el-badge>
                <el-badge :value=3 class="route_item" type="warning">
                    <el-button size="large">待审核</el-button>
                </el-badge>
                <el-badge :value=1 class="route_item" type="success">
                    <el-button size="large">已审核</el-button>
                </el-badge>
                <el-badge :value=2 class="route_item" type="primary">
                    <el-button size="large">历史记录</el-button>
                </el-badge>
                <el-badge class="route_item" type="primary">
                    <el-button size="large">个人资料</el-button>
                </el-badge>
            </div>
            <div class="choose_book">
                <h1>选书架</h1>
                <el-row class="books">
                    <el-col :span="4" v-for="(o,index) in 8" :key="o" :offset="index===0||index===4 ? 1 : 2">
                        <el-card class="book_item" :body-style="{ padding: '0px' }">
                            <img src="http://img3m0.ddimg.cn/67/4/24003310-1_b_7.jpg">
                            <div class="book_Info">
                                <p><el-link href="https://element.eleme.io" type="primary">{{name}}</el-link></p>
                                <span>{{author}}&nbsp;/&nbsp;</span>
                                <span>{{title_date}}&nbsp;/&nbsp;</span>
                                <span>{{publisher}}</span>
                                <el-button type="primary" size="small" class="book_Info_btn">选中</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    export default {
        name: "Home",
        components: {
            Main
        },
        data(){
            return {
                img_url:[
                    require('../../assets/img/slideshow/s1.jpg'),
                    require('../../assets/img/slideshow/s2.jpg'),
                    require('../../assets/img/slideshow/s3.jpg'),
                    require('../../assets/img/slideshow/s4.jpg'),
                    require('../../assets/img/slideshow/s5.jpg'),
                ],
                name: '许纯杰nb',
                author:'许纯杰',
                title_date: '2019-10',
                publisher: '清华出版社'
            }
        }
    }
</script>

<style scoped>
    .screen {
        width: 80%;
        margin: 40px auto;
    }
    .img_item {
        height: 40vh;
    }
    .all_fun{
        width: 80%;
        margin: 40px auto;
    }
    .route_item{
        margin-top: 10px;
        margin-left: 8%;
    }
    .choose_book {
        width: 80%;
        border: 1px solid black;
        margin: 40px auto;
    }
    .choose_book h1{
        text-align: center;
        font-size: 40px;
        font-family: "华文楷体";
        margin-top: 1%;
    }
    .books {
        margin-bottom: 2%;
    }
    .book_item {
        margin-top: 10%;
    }
    .book_item img{
        width: 100%;
    }
    .book_Info {
        text-align: center;
        margin-top: 2%;
    }
    .book_Info .el-link{
        font-size: 20px;
    }
    .book_Info span {
        font-size: 12px;
    }
    .book_Info_btn {
        margin: 10px 0;
    }
</style>