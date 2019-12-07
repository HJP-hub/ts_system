<template>
    <el-dialog
            title="用户信息"
            :visible.sync="$store.state.user.other.visible"
            width="36%"
            center>
        <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formInline.user.realName" class="dialog_width">{{formInline.user.realName}}</el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio v-model="formInline.user.sex" label="男">男</el-radio>
                <el-radio v-model="formInline.user.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth">
                <el-input v-model="formInline.user.jobNumber" class="dialog_width"  :disabled="true">{{formInline.user.jobNumber}}</el-input>
            </el-form-item>
            <el-form-item label="学院" :label-width="formLabelWidth">
                <el-input v-model="formInline.user.college" class="dialog_width">{{formInline.user.college}}</el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="formInline.user.email" class="dialog_width">{{formInline.user.email}}</el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="pass">
                <el-input v-model="formInline.other.pass" class="dialog_width" show-password>{{formInline.other.pass}}</el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="formInline.user.phone" class="dialog_width">{{formInline.user.phone}}</el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
                <el-input v-model="formInline.other.checkPass" class="dialog_width" show-password>{{formInline.other.checkPass}}</el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="$store.state.user.other.visible = false" class="dialog_btn">取 消</el-button>
                <el-button type="primary" @click="updateInfo" class="dialog_btn">保 存</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "UserDialog",
        data(){
            const validatePass = (rule, value, callback) => {
                this.$refs.formInline.validateField('checkPass');
                callback();
            };
            const validatePass2 = (rule, value, callback) => {
                value = this.formInline.other.checkPass;
                if(value === '' && this.formInline.other.pass === ''){
                    callback();
                } else if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formInline.other.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formLabelWidth: '100px',
                formInline:this.$store.state.user,
                rules: {
                    email: [
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            updateInfo(){
                if (this.formInline.other.pass !== ''){
                    this.formInline.user.userPassword = this.formInline.other.pass;
                }
                if (this.formInline.user.userType === '教师'){
                    this.formInline.user.userType = 1;
                }else{
                    this.formInline.user.userType = 2
                }
                axios.put('/teacher',this.formInline.user)
                    .then(res => {
                        console.log(res);
                        this.$store.commit('setUser', res);
                    });
                this.$store.state.user.other.visible = false;
            }
        }
    }
</script>

<style scoped>

</style>