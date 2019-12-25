<template>
    <Main>
        <template>
            <h1 class="title">用户管理</h1>
            <el-row class="mar">
                <el-row>
                    <el-col :span="16">
                        <el-select v-model="req.college_id" placeholder="请选择学院" @change="teacher_request">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="电子信息学院" value="1"></el-option>
                            <el-option label="机电工程学院" value="2"></el-option>
                            <el-option label="计算机学院" value="3"></el-option>
                            <el-option label="材料与食品学院" value="4"></el-option>
                            <el-option label="人文社会科学学院" value="5"></el-option>
                            <el-option label="管理学院" value="6"></el-option>
                            <el-option label="经贸学院" value="7"></el-option>
                            <el-option label="外国语学院" value="8"></el-option>
                            <el-option label="艺术设计学院" value="9"></el-option>
                            <el-option label="马克思主义学院" value="10"></el-option>
                            <el-option label="体育部" value="11"></el-option>
                        </el-select>
                        <div class="table">
                            <el-table
                                    :data="teacher_info">
                                <el-table-column label="教师名称"align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.realName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工号"align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.jobNumber}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="学院" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.college}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="任务状态" align="center">
                                    <template slot-scope="scope">
                                        <el-tag type="success" v-if="scope.row.startTask===1">启动</el-tag>
                                        <el-tag type="danger" v-else>停止</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" width="120">
                                    <template slot-scope="scope">
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
                                        :page-size="req.size"
                                        :current-page.sync="req.page"
                                        @prev-click="prev"
                                        @next-click="next"
                                        @current-change="current">
                                </el-pagination>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="7" :push="2">
                        <div id="form">
                            <h2 class="title form_title">添加教师用户</h2>
                            <div id="text">
                                <el-form label-position="left"
                                         ref="form"
                                         :model="form"
                                         label-width="80px"
                                         :rules="rules">
                                    <el-form-item class="marbottom" label="教师名称" prop="realName">
                                        <el-input class="input_width" width="30px" size="small" v-model="form.realName"></el-input>
                                    </el-form-item>
                                    <el-form-item class="marbottom" label="工号" prop="jobNumber">
                                        <el-input class="input_width" size="small" v-model="form.jobNumber"></el-input>
                                    </el-form-item>
                                    <el-form-item class="marbottom" label="学院">
                                        <el-select v-model="form.college" placeholder="请选择" size="small" class="input_width">
                                            <el-option
                                                    v-for="item in college_options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="marbottom" label="性别">
                                        <el-radio v-model="form.sex" label="男" border size="mini">男</el-radio>
                                        <el-radio v-model="form.sex" label="女" border size="mini">>女</el-radio>
                                    </el-form-item>
                                    <el-form-item class="marbottom" label="邮箱" prop="email">
                                        <el-input class="input_width" size="small" v-model="form.email"></el-input>
                                    </el-form-item>
                                    <el-form-item class="marbottom" label="联系电话">
                                        <el-input class="input_width" size="small" v-model="form.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item class="marbottom" label="用户名">
                                        <el-input class="input_width" size="small" v-model="form.jobNumber" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item class="marbottom" label="密码">
                                        <el-input class="input_width" size="small" v-model="form.jobNumber" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button style="margin-left: 14%;" type="primary" @click="AddUser('form')">确认添加</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-row>
            <el-row class="mar">
                <el-col :span="4">
                    <el-button type="primary" round class="btnmar" icon="el-icon-document-remove" @click="GetTemplate">多用户模板</el-button><br/>
                    <el-upload
                            :action="req.file_url">
                        <el-button type="primary" class="btnmar" round icon="el-icon-notebook-2">多用户导入</el-button>
                    </el-upload>
                </el-col>
                <el-col :span="20">
                    <el-card class="box-card" shadow="always">
                        <div slot="header" class="clearfix">
                            <span><i class="el-icon-star-on"><strong>温馨提示</strong></i></span>
                        </div>
                        <div v-for="(item, index) in tips">
                            {{index+1}}、{{item}}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    import axios from 'axios'
    export default {
        name: "UserManagement",
        components: {
                Main
        },
        mounted(){
            this.teacher_request();
        },
        data(){
            return {
                tips:['请勿随意修改教师用户信息，保证教师能正常登录',
                    '在导入用户时请填写必要的信息，初始密码默认为教师工号',
                    '在多用户导入时请下载并按照“多用户”模板格式填写相关的教师信息，以免错误导入用户',
                    '修改秘书用户信息请联系数据库管理员'
                ],
                form: {
                    realName: '',
                    jobNumber: '',
                    college: '计算机学院',
                    sex: '',
                    email: '',
                    phone: '',
                    userType: 1,
                    userName: '',
                    userPassword: ''
                },
                centerDialogVisible: false,
                user:{
                    realName: ''
                },
                teacher_info: [],
                req: {
                    page: 1,
                    size: 7,
                    startTask: '',
                    college_id: '',
                    file_url: this.$store.state.request_url + '/secretary/excel'
                },
                page:{
                    total: 0
                },
                college_options:[{
                    value: '电子信息学院',
                    label: '电子信息学院'
                }, {
                    value: '机电工程学院',
                    label: '机电工程学院'
                }, {
                    value: '计算机学院',
                    label: '计算机学院'
                }, {
                    value: '材料与食品学院',
                    label: '材料与食品学院'
                }, {
                    value: '人文社会科学学院',
                    label: '人文社会科学学院'
                }, {
                    value: '管理学院',
                    label: '管理学院'
                }, {
                    value: '经贸学院',
                    label: '经贸学院'
                }, {
                    value: '外国语学院',
                    label: '外国语学院'
                }, {
                    value: '艺术设计学院',
                    label: '艺术设计学院'
                }],
                rules: {
                    realName: [
                        { required: true, message: '请输入教师名称', trigger: 'blur' },
                    ],
                    jobNumber: [
                        { required: true, message: '请输入工号', trigger: 'blur' },
                    ],
                    email: [
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]
                }
            }
        },
        methods: {
            prev() {
                this.req.page -= 1;
            },
            next() {
                this.req.page += 1;
            },
            current() {
                console.log('current:', this.req.page);
                this.teacher_request();
            },
            teacher_request() {
                axios.get('secretary/teacher' + '?page=' + this.req.page + '&size=' + this.req.size + '&startTask=' + this.req.startTask + '&collegeId=' + this.req.college_id)
                    .then(res => {
                        console.log('teacher_list:', res);
                        this.teacher_info = res.data.data.list;
                        this.page.total = res.data.data.total;
                    });
            },
            handleDelete(index) {
                this.$confirm('此操作将永久删除该申请表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('/secretary/teacher/' + this.teacher_info[index].id)
                        .then(() => {
                            if (this.teacher_info.length !== 1) {
                                this.teacher_info.splice(index, 1);
                            }
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
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
            checkForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.req_add_teacher();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败'
                        });
                        return false;
                    }
                })
            },
            AddUser(formName) {
                this.form.userName = this.form.jobNumber;
                this.form.userPassword = this.form.jobNumber;
                this.checkForm(formName);
            },
            req_add_teacher() {
                axios.post("secretary/teacher", this.form)
                    .then(res => {
                        console.log("success adduser:", res);
                        if ("CHECK_FAIL" in res.data.data){
                            this.$message({
                                message: res.data.data.CHECK_FAIL + ",请重填",
                                type: 'warning'
                            });
                        }else{
                            this.$message({
                                message: '添加用户成功！',
                                type: 'success'
                            });
                            this.form = {
                                realName: '',
                                jobNumber: '',
                                college: '计算机学院',
                                sex: '',
                                email: '',
                                phone: '',
                                userType: 1,
                                userName: '',
                                userPassword: ''
                            }
                        }
                    }).catch(error => {
                    console.log("error adduser:", error);
                });
            },
            GetTemplate() {
                location.href = this.$store.state.request_url + '/file/model.xls';
            },
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
    .mar {
        width: 80%;
        margin: 0 auto;
        padding-top: 1%;
    }
    .table{
        margin-top: 10px;
    }
    .page{
        margin-top: 20px;
        text-align: center;
    }
    #form {
        border: 1px solid;
        border-radius: 20px;
        padding-top: 10px;
    }
    #form .form_title{
        font-size: 36px;
    }
    .input_width{
        margin-left: 2%;
        width: 80%;
    }
    #text {
        margin-left: 11%;
    }
    .marbottom {
        margin-bottom: 14px;
    }
    .box-card{
         margin-top: 20px;
     }
    .btnmar {
        margin-top: 50px
    }
</style>