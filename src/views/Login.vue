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
                        if (res.data.data === '密码错误！') {
                                this.$message({
                                    message: '密码错误！',
                                    type: 'error',
                                    duration: 2000,
                                    center: true,
                                    offset: 150
                                });
                        }
                        if (res.data.data === '该用户不存在') {
                                this.$message({
                                    message: '该用户不存在',
                                    type: 'warning',
                                    duration: 2000,
                                    center: true,
                                    offset: 150
                                });
                        }
                        if (res.data.data.userType === 1){
                            this.$router.push('./teacher')
                        }
                        else if (res.data.data.userType === 2){
                            this.$router.push('./secretary')
                        }
                        sessionStorage.setItem("user",JSON.stringify(res.data.data))
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

    .mess_alert {
        width: 50px;
    }
</style>