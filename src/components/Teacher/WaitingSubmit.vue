<template>
    <Main>
        <template>
            <div>
                <h1 class="title">待提交申请表</h1>
                <div class="tip">
                    <el-tag size="medium">
                        <i class="el-icon-s-flag"></i>
                        <span>{{realName}}教师，您共有{{tableData.length}}张待提交的申请表，请尽快编辑完成它们，或者删除它们</span>
                    </el-tag>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%">
                    <el-table-column label="课程名称" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.courseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材名称" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.titleName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出版单位" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.publisher}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保存时间" align="center">
                        <template slot-scope="scope">
                            <el-date-picker
                                    v-model="scope.row.date"
                                    type="date"
                                    readonly>
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

<script>
    import Main from '../Main'
    import axios from 'axios'
    export default {
        name: "WaitingSubmit",
        components: {
            Main
        },
        mounted(){
            this.user_id = JSON.parse(sessionStorage.getItem("user")).id;
            axios.get('/teacher' + '/' + this.user_id + '/' + 1 + '?page=' + this.req.page + '&size=' +  this.req.size)
                .then(res =>{
                    console.log(res);
                    this.tableData = res.data.data.list;
                    this.page.total = res.data.data.total;
                });
            this.realName = JSON.parse(sessionStorage.getItem("user")).realName;
        },
        data(){
            return {
                user_id: '',
                tableData: [],
                realName: '',
                req: {
                    page: 1,
                    size: 10
                },
                page:{
                    total: 0
                }
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$router.push('applicationform/1/' + this.tableData[index].id)
            },
            handleDelete(index){
                this.$confirm('此操作将永久删除该申请表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('/teacher/' + this.tableData[index].id)
                        .then(res => {
                            if (this.tableData.length !== 1){
                                this.tableData.splice(index, 1);
                            }
                            if (this.tableData[this.tableData.length - 1].flag !== true){
                                this.tableData[this.tableData.length - 1].flag = true
                            }
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(error =>{
                        this.$message({
                            type: 'success',
                            message: '删除失败!'
                        });
                        this.page_request();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
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
                axios.get('/teacher' + '/' + this.user_id + '/' + 1 + '?page=' + this.req.page + '&size=' +  this.req.size)
                    .then(res =>{
                        console.log('getall:',res);
                        this.tableData = res.data.data.list;
                        this.page.total = res.data.data.total;
                    });
            }

        }
    }
</script>

<style scoped>
    .title{
        margin-top: 1%;
        font-size: 50px;
        text-align: center;
        font-family: '华文行楷';
        font-weight: 700;
        color: #565656;
    }
    .el-date-editor.el-input{
        width: 100%;
    }
    .tip {
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
    }
    .tip .el-tag{
        font-size: 20px;
        height: 40px;
        line-height: 40px;
        font-family: '华文彩云';
    }
    .page{
        margin-top: 20px;
        text-align: center;
    }
</style>