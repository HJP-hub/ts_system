<template>
    <Main>
        <template>
            <div>
                <h1 class="title">历史记录</h1>
                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%">
                    <el-table-column label="课程名称" width="210" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.courseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材名称" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.titleName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出版单位" width="210" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.publisher }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作时间" width="200" align="center">
                        <template slot-scope="scope">
                            <el-date-picker
                                    v-model="scope.row.date"
                                    type="date"
                                    readonly>
                            </el-date-picker>
                        </template>s
                    </el-table-column>
                    <el-table-column label="状态" width="160" align="center">
                        <template slot-scope="scope">
                            <el-tag type="info" v-if="scope.row.status===1">待提交</el-tag>
                            <el-tag v-else-if="scope.row.status===2">未审核</el-tag>
                            <el-tag type="success" v-else-if="scope.row.status===3">已审核</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    v-if="scope.row.status===1"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    v-else
                                    @click="handleLook(scope.$index, scope.row)">详情</el-button>
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
                            :current-page="req.page"
                            @prev-click="prev"
                            @next-click="next"
                            @current-change="current">
                    </el-pagination>
                </div>
            </div>
            <FormDialog :PData="CData"></FormDialog>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    import axios from 'axios'
    import FormDialog from './FormDialog'
    export default {
        name: "History",
        components: {
            Main,
            FormDialog
        },
        mounted(){
            this.user_id = JSON.parse(sessionStorage.getItem("user")).id;
            axios.get('/teacher/getall/' + this.user_id + '?page=' + this.req.page + '&size=' +  this.req.size)
                .then(res =>{
                    console.log('getall:',res);
                    this.tableData = res.data.data.list;
                    this.page.total = res.data.data.total;
                });
        },
        data() {
            return {
                user_id: '',
                dialogVisible: false,
                tableData: [],
                req: {
                    page: 1,
                    size: 10
                },
                CData:{
                    Visible: false,
                    textbook: '',
                    tableData: []
                },
                page:{
                    total: 0
                }
            }
        },
        methods: {
            handleEdit(index) {
                this.$router.push('applicationform/' + this.tableData[index].id)
            },
            handleLook(index) {
                axios.get('/teacher/findtextbook/' + this.tableData[index].id)
                    .then(res => {
                        console.log('FormDialog',res);
                        this.CData.textbook = res.data.data.textbook;
                        this.CData.tableData = res.data.data.class;
                        this.CData.Visible=true;
                    });
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
                axios.get('/teacher/getall/' + this.user_id + '?page=' + this.req.page + '&size=' +  this.req.size)
                    .then(res =>{
                        console.log('getall:',res);
                        this.tableData = res.data.data.list;
                        // this.$set(this.tableData,res.data.data.list);
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
        width: 80%;
    }
    .page{
        margin-top: 20px;
        text-align: center;
    }
</style>