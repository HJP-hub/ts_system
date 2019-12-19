<template>
    <el-dialog
            title="申请表信息"
            :visible.sync="PData.Visible"
            width="60%"
            style="min-width: 586px"
            center
            close-on-press-escape>
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
            <el-col :span=18 :offset=3>
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
                                        align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.grade}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="专业、班级"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.subject}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="人数"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.number}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="必(选)修"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.classType}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="开课时间"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.date}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="开课学期"
                                        align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.semester}}</span>
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
                    <p class="marginTop"><span class="key-name">教师:</span><span>{{user.realName}}</span></p>
                    <div v-if="textbook.status===3 || textbook.status===4">
                        <p class="marginTop"><span class="key-name">申请时间:</span>{{textbook.date.split('T')[0]}}<span></span></p>
                        <p class="marginTop"><span class="key-name">审评意见:</span>{{textbook.reviewOpinion}}<span></span></p>
                        <p class="marginTop"><span class="key-name">审核状态:</span>{{textbook.status===3?'通过':'驳回'}}<span></span></p>
                    </div>
                    <div v-if="textbook.status===2 && user.userType === 2">
                        <p class="marginTop"><span class="key-name">申请时间:</span>{{textbook.date.split('T')[0]}}<span></span></p>
                        <p class="marginTop"><span class="key-name">审评意见</span></p>
                        <el-input type="textarea" class="input_width" v-model="reviewOpinion"></el-input>
                    </div>
                </div>
            </el-col>
            <el-col :span=10>
                <div class="applyTableShow" >
                    <p class="marginTop"><span class="key-name">联系电话:</span><span>{{textbook.phone}}</span></p>
                    <div v-if="textbook.status===3 || textbook.status===4">
                        <p class="marginTop"><span class="key-name">审核时间:</span>{{textbook.reviewDate.split('T')[0]}}<span></span></p>
                        <p class="bottom_btn">
                            <el-button type="primary" v-if="user.userType === 2 && textbook.status === 4" @click="close">确定</el-button>
                            <el-button type="primary" v-else-if="textbook.status === 4" @click="rewrite">重填</el-button>
                            <el-button type="primary" v-else-if="textbook.status === 3" @click="export_form">导出</el-button>
                            <el-button type="info" @click="close">取消</el-button>
                        </p>
                    </div>
                    <div  v-if="textbook.status===2 && user.userType === 2">
                        <p class="marginTop">
                            <el-radio v-model="status" :label=3 border>通过</el-radio>
                            <el-radio v-model="status" :label=4 border>驳回</el-radio>
                        </p>
                        <el-row>
                            <el-col push=3>
                                <p class="marginTop"><el-button type="primary" @click="submit">确认审核</el-button></p>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "FormDialog",
        props: ['PData'],
        data(){
            return {
                textbook: '',
                tableData:  [],
                user: {
                    realName: '',
                    userType: '',
                },
                status: 3,
                reviewOpinion: ' '
            }
        },
        mounted() {
            this.user.realName = JSON.parse(sessionStorage.getItem("user")).realName;
            this.user.userType = JSON.parse(sessionStorage.getItem("user")).userType;
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
            },
            submit(){
                axios.put('secretary/textbook/' + this.textbook.id + '/' + this.status,
                    this.reviewOpinion,
                    {
                        headers:{
                            'Content-Type': 'text/plain',
                        }
                    }
                ).then(res => {
                    console.log("check:", res);
                    this.$message({
                        message: '审核成功',
                        type: 'success'
                    });
                    this._props.PData.Visible = false;
                    this.$emit('list_req');
                }).catch(() => {
                    this.$message.error('审核失败');
                })
            },
            rewrite(){
                this.$router.push('applicationform/1/' + this.textbook.id)
            },
            export_form(){
                axios.get('teacher/excel/' + this.textbook.id)
                    .then(res => {
                        console.log("excel_id:", res);
                        location.href = this.$store.state.request_url + '/file/' + res.data.data;
                    })
            },
            close(){
                this._props.PData.Visible = false;
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
    .bottom_btn {
        margin-top: 44px;

    }
    .bottom_btn .el-button{
        margin-right: 30px;
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
    .input_width{
        width: 80%;
        margin-top: 4%;
    }
</style>