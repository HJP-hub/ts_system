<template>
    <el-main id="main">
        <slot></slot>
    </el-main>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>
    #main{
        background-color: #e5e5e5;
        height: 91vh;
    }
</style>