<template>
    <Main>
        <template>

            <div class="screen" >
                <el-carousel :interval="4000" type="card" height="400px">
                    <el-carousel-item v-for="item_src in img_url">
                        <el-image :src="item_src" class="img_item"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="all_fun">
                <el-badge class="route_item">
                    <el-button size="large" @click="$router.push('./applicationform/0/-1')">填写申请表</el-button>
                </el-badge>
                <el-badge :value=FormNum.unSubmit class="route_item">
                    <el-button size="large" @click="$router.push('./waitingsubmit')">待提交</el-button>
                </el-badge>
                <el-badge :value=FormNum.unReview class="route_item" type="warning">
                    <el-button size="large" @click="$router.push('./unchecked')">待审核</el-button>
                </el-badge>
                <el-badge :value=FormNum.review class="route_item" type="success">
                    <el-button size="large" @click="$router.push('./checked')">已审核</el-button>
                </el-badge>
                <el-badge :value=FormNum.count class="route_item" type="primary">
                    <el-button size="large" @click="$router.push('./history')">历史记录</el-button>
                </el-badge>
                <el-badge class="route_item" type="primary">
                    <el-button size="large" @click="Visible.PVisible=true">个人资料</el-button>
                </el-badge>
            </div>
            <UserDialog :CVisible="Visible"></UserDialog>
            <div class="choose_book">
                <h1>{{user.college}}推荐书籍</h1>
                <el-button type="primary" size="small" class="book_change_btn" @click="chang_book">换一批</el-button>
                <el-row class="image">
                    <el-col :span="4" v-for="(book,index) in books" :key="index" :offset="index===0||index===4 ? 1 : 2">
                        <el-card class="book_item" :body-style="{ padding: '0px' }">
                            <img :src=book.imageUrl>
                            <div class="book_Info">
                                <div>
                                    <p><el-link :href=book.bookUrl type="primary">{{book.titleName===undefined?book.titleName:book.titleName.substring(0,book.titleName.length>15?15:book.titleName.length) + '...'}}</el-link></p>
                                    <span>{{book.author===undefined?book.author:book.author.substring(0,book.author.length>12?12:book.author.length) + '...'}}&nbsp;/&nbsp;</span>
                                    <span>{{book.titleDate}}&nbsp;/&nbsp;</span>
                                    <span>{{book.publisher}}</span>
                                </div>
                                <el-button type="primary" size="small" class="book_Info_btn" @click="$router.push('applicationform/0/' + book.id)">选中</el-button>
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
    import UserDialog from '../UserDialog'
    import axios from 'axios'
    export default {
        name: "Home",
        components: {
            Main,
            UserDialog
        },
        mounted(){
            this.user_id = JSON.parse(sessionStorage.getItem("user")).id;
            this.user.college = JSON.parse(sessionStorage.getItem("user")).college;
            this.user.startTask = JSON.parse(sessionStorage.getItem("user")).startTask;
            this.req.college_id = this.$store.state.collegeName.indexOf(this.user.college, 0) + 1;
            axios.get('teacher/statistics/' + this.user_id)  //请求各类型表的数目
                .then(res => {
                    console.log("home_formnum:", res);
                    this.FormNum = res.data.data;
                });
            this.req.page = Math.floor(Math.random()*(this.req.total / 8)) + 1;
            axios.get('main/' + this.req.college_id  + '?page=' + this.req.page + '&size=' +  this.req.size)  //请求推荐书籍数据
                .then(res => {
                    console.log("book:", res);
                    this.books = res.data.data.list;
                    this.req.total = res.data.data.total;
                });
            if (this.user.startTask === 1){
                this.open1();
            }
        },
        data(){
            return {
                user:{
                    college: ''
                },
                img_url:[
                    require('../../assets/img/slideshow/s1.jpg'),
                    require('../../assets/img/slideshow/s2.jpg'),
                    require('../../assets/img/slideshow/s3.jpg'),
                    require('../../assets/img/slideshow/s4.jpg'),
                    require('../../assets/img/slideshow/s5.jpg'),
                ],
                books:{
                    id: '',
                    bookUrl: '',
                    imageUrl: '',
                    titleName: ' ',
                    author:'',
                    titleDate: '',
                    publisher: '',
                },
                Visible:{
                    PVisible: false
                },
                FormNum: {
                    unSubmit: 0,
                    unReview: 0,
                    review: 0,
                    count: 0
                },
                req: {
                    page: 1,
                    size: 8,
                    college_id: 0,
                    total: 600,
                },
            }
        },
        methods: {
            open1() {
                const h = this.$createElement;
                this.$notify({
                    title: '任务通知',
                    offset: 70,
                    message: h('i', { style: 'color: teal'}, '教材申请表填写任务已开启，请您于近期内填写相应的教材申请表。')
                });
            },
            chang_book(){
                this.req.page = Math.floor(Math.random()*(this.req.total / 8)) + 1;
                axios.get('main/' + this.req.college_id  + '?page=' + this.req.page + '&size=' +  this.req.size)  //请求推荐书籍数据
                    .then(res => {
                        console.log("book:", res);
                        this.books = res.data.data.list;
                    })
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
        padding-bottom: 1%;
        position: relative;
    }
    .choose_book h1{
        text-align: center;
        font-size: 40px;
        font-family: "华文楷体";
        margin-top: 1%;
    }
    .book_change_btn{
        position: absolute;
        z-index: 999;
        top: 3%;
        right: 4%;
    }
    .book_item {
        margin-top: 10%;
        height: 360px;
        position: relative;
    }
    .book_item img{
        width: 100%;
    }
    .book_Info {
        text-align: center;
        margin-top: 2%;
    }
    .book_Info .el-link{
        font-size: 16px;
    }
    .book_Info span {
        font-size: 12px;
    }
    .book_Info_btn {
        position: absolute;
        bottom: 4%;
        left: 50%;
        margin-left: -28px;
    }
</style>