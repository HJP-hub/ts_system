<template>
    <el-header id="Head" height="80px">
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="4">
                <img class="logo" src="../assets/img/logo.png"/>
            </el-col>
            <el-col :span="4">
                <div class="head_right">
                    <span class="head_text_color">{{$store.state.user.user.realName}}{{$store.state.user.user.userType}} </span>
                    <el-button type="text" class="head_text_color" @click="Logout">注销</el-button>
                </div>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    export default {
        name: "Head",
        data(){
            return {
            }
        },
        methods: {
            Logout(){
                this.$router.replace('/login')
            }
        },
    }
</script>

<style scoped>
    #Head {
        background: #339999;
        width: 100%;
    }

    .logo {
        margin-top: 10px;
        height: 60px;
    }

    .head_text_color{
        margin-top: 18px;
        color: #fff;
        font-size: 24px;
        font-family: '华文楷体';
    }

    .el-button:hover{
        color: #565656;
    }

</style>