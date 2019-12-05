<template>
    <Main>
        <div>
            <h1 class="title">个人资料</h1>
            <div id="form">
                <div id="text">
                    <el-form :inline="true" :model="formInline" size="medium" label-position="left">
                        <div class="form_col form_fir_col">
                            <el-form-item label="用户名" :label-width="formLabelWidth">
                                <el-input v-model="$store.state.user.name" class="input_width">{{$store.state.user.name}}</el-input>
                            </el-form-item>
                            <el-form-item label="工号" :label-width="formLabelWidth">
                                <el-input v-model="$store.state.user.job_number" class="input_width"  :disabled="true">{{$store.state.user.job_number}}</el-input>
                            </el-form-item>
                            <el-form-item label="性别" :label-width="formLabelWidth">
                                <el-input v-model="$store.state.user.sex" class="input_width">{{$store.state.user.sex}}</el-input>
                            </el-form-item>
                            <el-form-item label="年龄" :label-width="formLabelWidth">
                                <el-input v-model="$store.state.user.age" class="input_width">{{$store.state.user.age}}</el-input>
                            </el-form-item>
                            <el-form-item label="新密码" :label-width="formLabelWidth">
                                <el-input v-model="$store.state.user.new_password" class="input_width"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" :label-width="formLabelWidth">
                                <el-input v-model="$store.state.user.phone" class="input_width">{{$store.state.user.phone}}</el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" :label-width="formLabelWidth">
                                <el-input v-model="$store.state.user.confirm_password" class="input_width"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" :label-width="formLabelWidth">
                                <el-input v-model="$store.state.user.email" class="input_width">{{$store.state.user.email}}</el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </Main>
</template>

<script>
    import Main from '../Main'
    export default {
        name: "ShowInformation",
        components: {
            Main
        }
    }
</script>

<style scoped>
    .title{
        margin-top: 1%;
        font-size: 50px;
        text-align: center;
        font-family: '华文行楷';
        font-weight: 700;
        color: #565656;
    }
    #form {
        width: 70%;
        margin: 50px auto;
        border: 1px solid;
        border-radius: 20px;
        padding-top: 24px;
    }
    .form_col{
        width: 40%;
        display: inline-block;
    }
    .form_fir_col{
        margin-left: 15%;
    }
    .input_width{
        width: 110%;
    }
</style>