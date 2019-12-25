<template>
    <Main>
        <template>
            <div>
                <h1 class="title">申请表历史</h1>
                <el-form :inline="true" :model="formInline" class="mar">
                    <el-row>
                        <el-col :span="18" :push="1" class="select_row">
                            <el-form-item label="按学院查询">
                                <el-select v-model="req.college_id" placeholder="请选择查询条件"  @change="page_request">
                                    <el-option
                                            v-for="item in college_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="申请表状态">
                                <el-select v-model="req.status" placeholder="申请表状态" @change="page_request">
                                    <el-option label="全部" value="-1"></el-option>
                                    <el-option label="通过" value="3"></el-option>
                                    <el-option label="驳回" value="4"></el-option>
                                    <el-option label="未审核" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :push="3">
                            <el-button type="primary" icon="el-icon-document" class="exportbnt" @click="export_list">导出</el-button>
                        </el-col>
                    </el-row>
                </el-form>

                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column label="申请人" width="100" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.teacherName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材名称" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.titleName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="课程名称" width="150" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.courseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请日期" width="160" align="center">
                        <template slot-scope="scope">
                            <el-date-picker
                                    v-model="scope.row.date"
                                    type="date"
                                    readonly>
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核日期" width="160" align="center">
                        <template slot-scope="scope">
                            <el-date-picker
                                    v-model="scope.row.reviewDate"
                                    type="date"
                                    readonly>
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="100" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status===2">未审核</el-tag>
                            <el-tag type="success" v-else-if="scope.row.status===3">通过</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.status===4">驳回</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="120">
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handleLook(scope.$index)">详情</el-button>
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
        <FormDialog :PData="CData" @list_req="page_request"></FormDialog>
    </Main>
</template>

<script>
    import Main from '../Main'
    import axios from 'axios'
    import FormDialog from '../FormDialog'
    export default {
        name: "SHistory",
        components: {
            Main,
            FormDialog
        },
        mounted(){
            this.req.college_id = 0;
            this.req.status = -1;
            this.page_request();
            this.req.college_id = '';
            this.req.status = '';
        },
        data(){
            return {
                formInline: {},
                tableData: [],
                req: {
                    page: 1,
                    size: 10,
                    college_id: '',
                    status: '',
                    list_id: []
                },
                page:{
                    total: 0
                },
                CData:{
                    Visible: false,
                    textbook: '',
                    tableData: [],
                    teacherName: ''
                },
                college_options:[{
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '电子信息学院'
                }, {
                    value: '2',
                    label: '机电工程学院'
                }, {
                    value: '3',
                    label: '计算机学院'
                }, {
                    value: '4',
                    label: '材料与食品学院'
                }, {
                    value: '5',
                    label: '人文社会科学学院'
                }, {
                    value: '6',
                    label: '管理学院'
                }, {
                    value: '7',
                    label: '经贸学院'
                }, {
                    value: '8',
                    label: '外国语学院'
                }, {
                    value: '9',
                    label: '艺术设计学院'
                }],
            }
        },
        methods: {
            handleLook(index) {
                axios.get('/teacher/findtextbook/' + this.tableData[index].id)
                    .then(res => {
                        console.log('FormDialog',res);
                        this.CData.textbook = res.data.data.textbook;
                        this.CData.tableData = res.data.data.class;
                        this.CData.teacherName = this.tableData[index].teacherName;
                        this.CData.Visible=true;
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
                axios.get('secretary/textbook/history' + '?page=' + this.req.page + '&size=' +
                    this.req.size + '&status=' + this.req.status + '&collegeId=' + this.req.college_id)
                    .then(res =>{
                        console.log('getall:',res);
                        this.tableData = res.data.data.list;
                        this.page.total = res.data.data.total;
                    });
            },
            handleSelectionChange(val) {
                this.req.list_id = val;
                for (let i = 0; i < this.req.list_id.length; i++){
                    this.req.list_id[i] = this.req.list_id[i].id;
                }
            },
            export_list(){
                axios.post("secretary/excel/out",this.req.list_id)
                    .then(res => {
                        console.log("export_list:",res);
                        location.href = 'http://172.16.61.151:9090/api/file/' + res.data.data;
                    })
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
    .mar {
        width: 80%;
        margin: 0 auto;
        padding-top: 1%;
    }
    .select_row{
        margin-bottom: -4%;
    }
    .dialogtip {
        margin-left: 21%;
        color: #e09265;
    }

</style>