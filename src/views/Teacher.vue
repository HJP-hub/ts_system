<template>
    <el-container direction="vertical">
        <Head></Head>
        <el-container>
            <teacher-aside></teacher-aside>
            <router-view></router-view>
        </el-container>
    </el-container>
</template>

<script>
    import Head from '../components/Head'
    import TeacherAside from '../components/Teacher/TeacherAside'
    import Main from '../components/Main'
    export default {
        name: "teacher",
        components:{
            Head,
            TeacherAside,
            Main
        }
    }
</script>

<style scoped>
</style>