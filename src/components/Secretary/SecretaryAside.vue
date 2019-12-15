<template>
    <el-aside id="aside">
        <el-menu :default-openeds="['1']"
                 :default-active="$route.name"
                 background-color="#545c64"
                 text-color="#fff"
                 router
                 active-text-color="#ffd04b">
            <el-menu-item index="s_home" :route="{name: 's_home'}"><i class="el-icon-s-home"></i>主页</el-menu-item>
            <el-menu-item index="applicationformexport" :route="{name: 'applicationformexport'}"><i class="el-icon-edit-outline"></i>启动任务</el-menu-item>
            <el-menu-item index="applicationformcheck" :route="{name: 'applicationformcheck'}"><i class="el-icon-edit"></i>申请审核</el-menu-item>
            <el-menu-item index="s_history" :route="{name: 's_history'}"><i class="el-icon-document-checked"></i>审核历史</el-menu-item>
            <el-menu-item index="usermanagement" :route="{name: 'usermanagement'}"><i class="el-icon-box"></i>用户管理</el-menu-item>
            <el-menu-item @click="Visible.PVisible=true"><i class="el-icon-user"></i>个人资料</el-menu-item>
        </el-menu>
        <UserDialog :CVisible="Visible"></UserDialog>
    </el-aside>
</template>

<script>
    import UserDialog from '../UserDialog'
    export default {
        name: "SecretaryAside",
        data(){
            return {
                Visible:{
                    PVisible: false
                }
            }
        },
        components:{
            UserDialog
        }
    }
</script>

<style scoped>
    #aside {
        background-color: #545c64;
    }
    aside span {
        font-size: 18px;
    }
    aside li {
        margin-left: 10px;
        font-size: 18px;
    }
</style>