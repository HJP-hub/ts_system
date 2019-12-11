<template>
    <Main>
        <template>
            <div class="all_fun">
                <el-badge :value="12" class="route_item">
                    <el-button size="large">待提交</el-button>
                </el-badge>
                <el-badge :value="3" class="route_item" type="warning">
                    <el-button size="large">待审核</el-button>
                </el-badge>
                <el-badge :value="1" class="route_item" type="success">
                    <el-button size="large">已审核</el-button>
                </el-badge>
                <el-badge :value="2" class="route_item" type="primary ">
                    <el-button size="large">历史记录</el-button>
                </el-badge>
            </div>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    export default {
        name: "Home",
        components: {
            Main
        }
    }
</script>

<style scoped>
    .all_fun{
        text-align: center;
    }
    .route_item{
        margin-left: 10%;
    }
</style>