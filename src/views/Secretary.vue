<template>
    <el-container  direction="vertical">
        <Head></Head>
        <el-container>
            <secretary-aside></secretary-aside>
            <router-view></router-view>
        </el-container>
        <Foot></Foot>
    </el-container>
</template>

<script>
    import Head from '../components/Head'
    import SecretaryAside from '../components/Secretary/SecretaryAside'
    import Main from '../components/Main'
    import Foot from '../components/Foot'
    export default {
        name: "secretary",
        components: {
            Head,
            SecretaryAside,
            Main,
            Foot
        }
    }
</script>

<style scoped>

</style>