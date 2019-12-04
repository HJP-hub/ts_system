<template>
    <div id="Head">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="16">
                <img class="logo" src="../assets/img/logo.png"/>
            </el-col>
            <el-col :span="2">
                <div class="head_right">
                    <el-button type="text" class="head_text_color" @click="DialogVisible = true">{{$store.state.user.name}}{{usertype}}</el-button>
                    <el-button type="text" class="head_text_color" @click="Logout">注销</el-button>
                </div>
            </el-col>
        </el-row>
        <el-dialog
                title="用户信息"
                :visible.sync="DialogVisible"
                width="36%"
                center>
            <el-form :inline="true" :model="formInline">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="$store.state.user.name" class="dialog_width">{{$store.state.user.name}}</el-input>
                </el-form-item>
                <el-form-item label="工号" :label-width="formLabelWidth">
                    <el-input v-model="$store.state.user.job_number" class="dialog_width"  :disabled="true">{{$store.state.user.job_number}}</el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="$store.state.user.sex" class="dialog_width">{{$store.state.user.sex}}</el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="$store.state.user.age" class="dialog_width">{{$store.state.user.age}}</el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="$store.state.user.new_password" class="dialog_width"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="$store.state.user.phone" class="dialog_width">{{$store.state.user.phone}}</el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="$store.state.user.confirm_password" class="dialog_width"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="$store.state.user.email" class="dialog_width">{{$store.state.user.email}}</el-input>
                </el-form-item>
                <p>密码不一致</p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogVisible = false" class="dialog_btn">取 消</el-button>
                <el-button type="primary" @click="DialogVisible = false" class="dialog_btn">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Head",
        data(){
            return {
                usertype: '教师',
                DialogVisible: false,
                formLabelWidth: '70px',
                new_password: '',
                confirm_password: '',
                formInline:{
                }
            }
        },
        methods: {
            Logout(){
                this.$router.push('./login')
            }
        }
    }
</script>

<style scoped>
    #Head {
        background: #339999;
        height: 60px;
    }

    .logo {
        height: 60px;
    }

    .head_text_color{
        margin-top: 10px;
        color: #fff;
        font-size: 18px;
    }

    .dialog_width{
        width: 80%;
    }

    .el-button:hover{
        color: black;
    }

    .dialog_btn{
        width: 20%;
    }
</style>