<template>
    <Main>
        <template>
            <div>
                <h1 class="title">申请表审核</h1>
                <div class="tip">
                    <el-tag size="medium">
                        <i class="el-icon-s-flag"></i>
                        <span>温馨提示：请认真审核每一张申请表，为学生的教学保驾护航！</span>
                    </el-tag>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%">
                    <el-table-column label="申请人" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.teacherName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材名称" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.titleName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="课程名称" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.courseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材类型"  align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.titleType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请日期" align="center">
                        <template slot-scope="scope">
                            <el-date-picker
                                    v-model="scope.row.date"
                                    type="date"
                                    readonly>
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleLook(scope.$index, scope.row)">审核</el-button>
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
            <FormDialog :PData="CData" @list_req="list_req"></FormDialog>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    import axios from 'axios'
    import FormDialog from '../FormDialog'
    export default {
        name: "ApplicationFormCheck",
        components: {
            Main,
            FormDialog
        },
        mounted(){
            this.list_req();
        },
        data(){
            return {
                user:{
                    college: ''
                },
                tableData: [],
                CData:{
                    Visible: false,
                    textbook: '',
                    tableData: [],
                    teacherName: ''
                },
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
            handleLook(index) {
                axios.get('/teacher/findtextbook/' + this.tableData[index].id)
                    .then(res => {
                        console.log('FormDialog',res);
                        this.CData.textbook = res.data.data.textbook;
                        this.CData.tableData = res.data.data.class;
                        this.CData.Visible=true;
                        this.CData.teacherName = this.tableData[index].teacherName;
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
                this.list_req();
            },
            list_req(){
                axios.get('secretary/textbook/' + 2 + '?page=' + this.req.page + '&size=' +  this.req.size)
                    .then(res =>{
                        console.log("getall:",res);
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
