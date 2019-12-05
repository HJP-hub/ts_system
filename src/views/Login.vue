<template>
    <div id="login" class="login-bgn">
        <div class="v-center">
            <div id="box">
                <h1 class="login_title">教材选定系统</h1>
                <div class="line_input"><el-input class="input-text margin_50top" placeholder="请输入用户名" prefix-icon="el-icon-s-custom" size="medium" v-model="user.userName"></el-input></div>
                <div class="line_input"><el-input class="input-text margin_50top" placeholder="请输入密码" prefix-icon="el-icon-lock" size="medium"  v-model="user.userPassword" show-password></el-input></div>
                <el-button type="primary" round @click="login" class="login_btn margin_50top">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "login",
        data(){
            return {
                user: {
                    userName:"",
                    userPassword:""
                }
            }
        },
        methods: {
            login(){
                axios.post('/login', this.user)
                    .then(res => {
                        console.log(res);
                        if (res.data.data.userType === 1){
                            this.$store.state.user.userType = '教师';
                            this.$router.push('./teacher')
                        }
                        else if (res.data.data.userType === 2){
                            this.$store.state.user.userType = '秘书';
                            this.$router.push('./secretary')
                        }
                        this.$store.state.user.name = res.data.data.realName;
                        this.$store.state.user.age = res.data.data.age;
                        this.$store.state.user.job_number = res.data.data.jobNumber;
                        if (res.data.data.sex === '1'){
                            this.$store.state.user.sex = '男';
                        }else{
                            this.$store.state.user.sex = '女';
                        }
                        this.$store.state.user.phone = res.data.data.phone;
                        this.$store.state.user.email = res.data.data.email;

                    })
                }
            }
        }
</script>

<style scoped>
    .margin_50top {
        margin-top: 50px;
    }

    .v-center {
        padding-top: 6%;
    }
    .login-bgn {
        background: url("../assets/img/bg.jpg") ;
        background-size: 100% 100%;
        height: 100vh;
    }
    #box {
        height: 320px;
        width: 26%;
        margin: 100px auto;
        border-radius: 10px;
        min-width: 400px;
        background: rgba(255,255,255, 0.5);
        padding-top: 20px;
    }

    .login_title{
        text-align: center;
        font-size: 44px;
        letter-spacing: 6px;
        color: #009688;
    }

    .input-text{
        width: 58%;
        margin-left: 21%;
        height: 23px;
    }

    .login_btn {
        min-width: 100px;
        margin-left: 20%;
        width: 60%;
    }
</style>