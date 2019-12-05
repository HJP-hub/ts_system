<template>
    <el-dialog
            title="用户信息"
            :visible.sync="DialogVisible"
            width="36%"
            center>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="$store.state.user.name" class="dialog_width">{{$store.state.user.name}}</el-input>
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth">
                <el-input v-model="$store.state.user.job_number" class="dialog_width"  :disabled="true">{{$store.state.user.job_number}}</el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="$store.state.user.sex" class="dialog_width">{{$store.state.user.sex}}</el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="$store.state.user.age" class="dialog_width">{{$store.state.user.age}}</el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="$store.state.user.phone" class="dialog_width">{{$store.state.user.phone}}</el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="$store.state.user.email" class="dialog_width">{{$store.state.user.email}}</el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="$store.state.user.new_password" class="dialog_width"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input v-model="$store.state.user.confirm_password" class="dialog_width"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="DialogVisible = false" class="dialog_btn">取 消</el-button>
                <el-button type="primary" @click="DialogVisible = false" class="dialog_btn">保 存</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "UserDialog",
        formLabelWidth: '70px',
        new_password: '',
        confirm_password: '',
        formInline:{
        }
    }
</script>

<style scoped>

</style>