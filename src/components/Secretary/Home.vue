<template>
    <Main>
        <template>
            <div>
                <div class="screen" >
                    <el-carousel :interval="4000" type="card" height="400px">
                        <el-carousel-item v-for="item_src in img_url">
                            <el-image :src="item_src" class="img_item"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%">
                    <el-table-column label="出版社名称" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.publisher}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请次数" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.number}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="page.total"
                            :current-page.sync="req.page"
                            @prev-click="prev"
                            @next-click="next"
                            @current-change="current">
                    </el-pagination>
                </div>
            </div>
        </template>
    </Main>
</template>
<FormDialog :PData="CData"></FormDialog>

<script>
    import Main from '../Main'
    import axios from 'axios'
    export default {
        name: "SHome",
        components: {
            Main
        },
        mounted(){
            let id = JSON.parse(sessionStorage.getItem("user")).id;
            axios.get('/teacher/' + id)
                .then(res => {
                        sessionStorage.setItem("user",JSON.stringify(res.data.data));
                        this.page_request();
                    }
                );
        },
        data(){
            return {
                tableData: [],
                req: {
                    page: 1,
                    size: 5
                },
                page:{
                    total: 0
                },
                img_url:[
                    require('../../assets/img/slideshow/s1.jpg'),
                    require('../../assets/img/slideshow/s2.jpg'),
                    require('../../assets/img/slideshow/s3.jpg'),
                    require('../../assets/img/slideshow/s4.jpg'),
                    require('../../assets/img/slideshow/s5.jpg'),
                ],
            }
        },
        methods:{
            prev(){
                this.req.page -= 1;
            },
            next(){
                this.req.page += 1;
            },
            current(){
                console.log('current:',this.req.page);
                this.page_request();
            },
            page_request(){
                axios.get('main/publisher' + '?page=' + this.req.page + '&size=' +  this.req.size)
                    .then(res =>{
                        console.log('getall:',res);
                        this.tableData = res.data.data.publisher;
                        this.page.total = res.data.data.total;
                    });
            }
        }

    }
</script>

<style scoped>
    .page{
        margin-top: 20px;
        text-align: center;
    }
    .img_item {
        height: 40vh;
    }
</style>