<template>
    <el-dialog
            title="用户信息"
            :visible.sync="$store.state.user.visible"
            width="36%"
            center>
        <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formInline.realName" class="dialog_width">{{formInline.realName}}</el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio v-model="formInline.sex" label="男">男</el-radio>
                <el-radio v-model="formInline.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth">
                <el-input v-model="formInline.jobNumber" class="dialog_width"  :disabled="true">{{formInline.jobNumber}}</el-input>
            </el-form-item>
            <el-form-item label="学院" :label-width="formLabelWidth">
                <el-input v-model="formInline.college" class="dialog_width">{{formInline.college}}</el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="formInline.email" class="dialog_width">{{formInline.email}}</el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="pass">
                <el-input v-model="formInline.pass" class="dialog_width" show-password>{{formInline.pass}}</el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="formInline.phone" class="dialog_width">{{formInline.phone}}</el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
                <el-input v-model="formInline.checkPass" class="dialog_width" show-password>{{formInline.checkPass}}</el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="$store.state.user.visible = false" class="dialog_btn">取 消</el-button>
                <el-button type="primary" @click="updateInfo" class="dialog_btn">保 存</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "UserDialog",
        props: ['DialogVisible'],
        data(){
            const validatePass = (rule, value, callback) => {
                    this.$refs.formInline.validateField('checkPass');
                callback();
            };
            const validatePass2 = (rule, value, callback) => {
                if(value === '' && this.formInline.pass === ''){
                    callback();
                } else if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formInline.pass) {
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
                if (this.formInline.pass !== ''){
                    this.formInline.userPassword = this.formInline.pass;
                }
                if (this.formInline.userType === '教师'){
                    this.formInline.userType = 1;
                }else{
                    this.formInline.userType = 2
                }
                const data =  JSON.parse(JSON.stringify(this.formInline));
                delete data.pass;
                delete data.checkPass;
                delete data.visible;
                axios.put('/teacher',data)
                    .then(res => {
                        console.log(res);
                        this.$store.commit('setUser', res);
                    });
                this.$store.state.user.visible = false;
            }
        }
    }
</script>

<style scoped>

</style>