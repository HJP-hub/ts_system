<template>
    <el-dialog
            title="申请表信息"
            :visible.sync="PData.Visible"
            width="60%"
            style="min-width: 586px"
            center>
        <el-row>
            <el-col :span=10 :offset=4><div class="applyTableShow">
                <p class="marginTop"><span class="key-name">课程名称:</span><span>{{textbook.courseName}}</span></p>
                <p class="marginTop"><span class="key-name">教材名称:</span><span>{{textbook.titleName}}</span></p>
                <p class="marginTop"><span class="key-name">编（著）者:</span><span>{{textbook.author}}</span></p>
                <p class="marginTop"><span class="key-name">版次:</span><span>{{textbook.version}}</span></p>
                <p class="marginTop"><span class="key-name">教材类型:</span><span>{{textbook.titleType}}</span></p>
            </div>
            </el-col>
            <el-col :span=10><div class="applyTableShow" >
                <p class="marginTop"><span class="key-name">课程学时数:</span><span>{{textbook.courseTime}}</span></p>
                <p class="marginTop"><span class="key-name">出版单位:</span><span>{{textbook.publisher}}</span></p>
                <p class="marginTop"><span class="key-name">出版时间:</span><span>{{textbook.titleDate}}</span></p>
                <p class="marginTop"><span class="key-name">书号ISBN:</span><span>{{textbook.isbn}}</span></p>
                <p class="marginTop"><span class="key-name">是否为近三年优质教材:</span><span>{{textbook.flag === 'true'? '是':'否'}}</span></p>
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span=20 :offset=2>
                <div class="applyTableShow">
                    <div class="Class">
                        <el-col :span=20 :offset=1>
                            <h3 class="tableTitle">开课班级</h3>
                        </el-col>
                        <div id="Class_table">
                            <el-table
                                    :data="tableData"
                                    :header-cell-style="tableHeaderColor">
                                <el-table-column
                                        label="年级"
                                        width="120"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.grade}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="专业、班级"
                                        width="220"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.subject}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="人数"
                                        width="100"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.number}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="必(选)修"
                                        width="200"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.classType}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="开课时间"
                                        align="center">
                                    <template slot-scope="scope">
                                        <el-date-picker
                                                v-model="scope.row.date"
                                                type="date"
                                                placeholder="选择日期"
                                                size="large"
                                                readonly="true">
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=10 :offset=4>
                <div class="applyTableShow">
                    <p class="marginTop">教师:</p>
                    <div>
                        <p class="marginTop">申请时间:</p>
                        <p class="marginTop">审评意见:</p>
                    </div>
                </div>
            </el-col>
            <el-col :span=10>
                <div class="applyTableShow" >
                    <p class="marginTop">联系电话:</p>
                    <div>
                        <p class="marginTop">审核时间:</p>
                        <p class="marginTop">审核人:</p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    export default {
        name: "FormDialog2",
        props: ['PData'],
        data(){
            return {
                textbook: '',
                tableData:  []
            }
        },
        watch: {
            PData:{
                handler:function(newValue){
                    this.textbook = newValue.textbook;
                    this.tableData = newValue.tableData;
                },
                deep:true,
            }
        },
        methods:{
            tableHeaderColor({rowIndex}) {
                if (rowIndex === 0) {
                    return 'background-color: #339999;color: #fff;font-weight: 600; text-align: center;'
                }
            }
        }
    }
</script>

<style scoped>
    .tableTitle {
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        margin-top: 60px;
        margin-bottom: 30px;
    }
    .applyTableShow {
        color: #838383;
        font-size: 15px;
    }
    .marginTop {
        margin-top: 30px;
    }
    .key-name{
        margin-right: 20px;
        font-weight: 700;
        /*color: ;*/
    }
    .applyTableShow span{
        font-size: 16px;
    }
    #Class_table{
        width: 100%;
        margin: 10px auto;
    }
    .el-date-editor.el-input{
        width: 80%;
    }
</style>