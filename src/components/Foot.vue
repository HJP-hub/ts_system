<template>
    <el-footer id="foot" height="150px">
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="2">
                <img class="foot_logo" style="margin-left: 14%" src="../assets/img/foot_logo_left.png"/>
            </el-col>
            <el-col :span="20" class="foot_middle">
                <h1>电子科技大学中山学院教材选定系统</h1>
                <div class="sub_title"><span>厚德</span><span>博学</span><span>求是</span><span>创新</span></div>
            </el-col>
            <el-col :span="2">
                <img class="foot_logo" src="../assets/img/foot_logo_right.png"/>
            </el-col>
        </el-row>
    </el-footer>
</template>

<script>
    export default {
        name: "Foot"
    }
</script>

<style scoped>
    #foot {
        background-color: #339999;
        width: 100%;
    }
    .foot_logo {
        height: 130px;
        margin-top: 10px;
    }
    .foot_middle {
        text-align: center;
        margin-top: 30px;
        color: white;
        font-family: "华文楷体";
    }
    .foot_middle h1{
        font-size: 36px;
        letter-spacing: 4px;
        font-weight: 700;
    }
    .foot_middle .sub_title{
        font-size: 26px;
        margin-top: 16px;
    }
    .foot_middle .sub_title span {
        margin-right: 20px;
    }
</style>