<template>
    <el-aside id="aside">
        <el-menu :default-openeds="['1','2']"
                 :default-active="$route.name"
                 background-color="#545c64"
                 text-color="#fff"
                 router
                 active-text-color="#ffd04b">
            <el-menu-item index="home" :route="{name: 'home'}"><i class="el-icon-s-home"></i>主页</el-menu-item>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i><span>教材申请</span></template>
                <el-menu-item index="applicationform" :route="{name: 'applicationform'}"><i class="el-icon-edit"></i>填写申请表</el-menu-item>
                <el-menu-item index="waitingsubmit" :route="{name: 'waitingsubmit'}"><i class="el-icon-edit-outline"></i>待提交</el-menu-item>
                <el-menu-item index="unchecked" :route="{name: 'unchecked'}"><i class="el-icon-document-copy"></i>待审核</el-menu-item>
                <el-menu-item index="checked" :route="{name: 'checked'}"><i class="el-icon-document-checked"></i>已审核</el-menu-item>
                <el-menu-item index="history" :route="{name: 'history'}"><i class="el-icon-box"></i>历史记录</el-menu-item>
            </el-submenu>
            <el-menu-item @click="Visible.PVisible=true"><i class="el-icon-user"></i>个人资料</el-menu-item>
        </el-menu>
        <UserDialog :CVisible="Visible"></UserDialog>
    </el-aside>
</template>

<script>
    import UserDialog from '../UserDialog'
    export default {
        name: "TeacherAside",
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