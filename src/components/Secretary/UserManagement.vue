<template>
    <Main>
        <template>
            <div>
                <h1 class="title">用户管理</h1>
                <el-form :inline="true" :model="formInline" class="mar">
                    <el-row >
                        <el-col span="17" offset="1">
                            <el-col span="11">
                                <el-form-item label="查询条件">
                                    <el-select v-model="formInline.region" placeholder="请选择查询条件">
                                        <el-option label="教师名称" value="shanghai"></el-option>
                                        <el-option label="学院" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col span="12" offset="1">
                                <el-form-item label="关键词">
                                    <el-input v-model="formInline.user" placeholder="请输入查询的关键词"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col span="6">
                            <el-col span="11" offset=1>
                                <el-button type="primary" icon="el-icon-document" >查询</el-button>
                            </el-col>
                            <el-col span="11" offset=1>
                                <el-button type="danger"icon="el-icon-delete" class="deletetbnt">删除</el-button>
                            </el-col>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="boxwidth">
                    <el-row>
                        <el-col span="15">
                            <el-table
                                    :data="tableData">
                                <el-table-column  width="26" align="center">
                                    <el-checkbox></el-checkbox>
                                </el-table-column>
                                <el-table-column label="教师名称" width="200" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">a</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工号" width="120" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">001</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="学院" width="250" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">计算机学院</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="历史申请" align="center">
                                    <template slot-scope="scope">
                                        <el-tag><span style="margin-left: 10px">已审核</span></el-tag>
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
                        </el-col>
                        <el-col span="8" offset="1">
                            <div id="form">
                                <div id="text">
                                    <el-form label-position="left" ref="form" :model="form" label-width="80px">
                                        <el-form-item class="marbottom" label="教师名称">
                                            <el-input class="input_width" width="30px" size="small" v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item class="marbottom" label="工号">
                                            <el-input class="input_width" size="small" v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item class="marbottom" label="学院">
                                            <el-input class="input_width" size="small" v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item class="marbottom" label="性别">
                                            <el-input class="input_width" size="small" v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item class="marbottom" label="邮箱">
                                            <el-input class="input_width" size="small" v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item class="marbottom" label="联系电话">
                                            <el-input class="input_width" size="small" v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item class="marbottom" label="新密码">
                                            <el-input class="input_width" size="small" v-model="form.name" show-password></el-input>
                                        </el-form-item>
                                        <el-form-item class="marbottom" label="确认密码">
                                            <el-input class="input_width" size="small" v-model="form.name" show-password></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button style="margin-left: 14%;" type="primary">确认修改</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>

                        </el-col>
                    </el-row>
                </div>
                <div class="boxwidth">
                    <el-row>
                        <el-col span="4">
                            <el-button type="primary" round class="btnmar" icon="el-icon-receiving">单用户导入</el-button><br/>
                            <el-button type="primary" round class="btnmar" icon="el-icon-notebook-2">多用户导入</el-button><br/>
                            <el-button type="primary" round class="btnmar" icon="el-icon-document-remove">多用户模板</el-button>

                        </el-col>
                        <el-col span="20">
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
                </div>

            </div>
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

        },
        data(){
            return {
                tips:['请勿随意修改教师用户信息，保证教师能正常登录',
                    '在导入用户时请填写必要的信息，初始密码默认为教师工号',
                    '在多用户导入时请下载并按照“多用户”模板格式填写相关的教师信息，以免错误导入用户',
                    '修改秘书用户信息请联系数据库管理员'
                ],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },

                centerDialogVisible: false,
                formInline: {
                    user: '',
                    region: ''
                },
                user:{
                    realName: ''
                },
                tableData: [
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                ],
                req: {
                    page: 1,
                    size: 5
                },
                page:{
                    total: 0
                },
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
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
                axios.get('secretary/college/' + this.college_id + '?page=' + this.req.page + '&size=' +  this.req.size)
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
    .mar {
        width: 80%;
        margin: 0 auto;
        padding-top: 1%;
    }
    .boxwidth {
        width: 80%;
        margin: 25px auto;

    }
    .page{
        margin-top: 20px;
        text-align: center;
    }
    #form {
        margin: 10px auto;
        border: 1px solid;
        border-radius: 20px;
        padding-top: 10px;
    }
    .input_width{
        margin-left: 2%;
        width: 80%;
    }
    #text {
        margin-left: 11%;
    }
    .marbottom {
        margin-bottom: 10px;
    }
    .box-card{
         margin-top: 20px;
     }
    .btnmar {
        margin-bottom: 10px; margin-top: 20px
    }
</style>