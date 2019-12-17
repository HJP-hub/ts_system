<template>
    <Main>
        <template>
            <div>
                <h1 class="title">电子科技大学中山学院教材选订申请表</h1>
                <div id="form">
                    <div id="text">
                        <el-form :inline="true" :model="formInline" size="medium" label-position="left" :rules="rules"  ref="formInline">
                            <el-row>
                                <el-col :span="12" :push=2>
                                    <div class="form_col form_fir_col">
                                        <el-form-item label="课程名称" :label-width="formLabelWidth" prop="courseNAME">
                                            <el-input v-model="formInline.textbook.courseName" class="input_width"></el-input>
                                        </el-form-item>
                                        <el-form-item label="教材名称" :label-width="formLabelWidth" prop="titleName">
                                            <el-input v-model="formInline.textbook.titleName" class="input_width"></el-input>
                                        </el-form-item>
                                        <el-form-item label="编(著)者" :label-width="formLabelWidth">
                                            <el-input v-model="formInline.textbook.author" class="input_width"></el-input>
                                        </el-form-item>
                                        <el-form-item label="版次" :label-width="formLabelWidth">
                                            <el-input-number v-model="formInline.textbook.version" :min="1" :max="20"></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="教材类型" :label-width="formLabelWidth">
                                            <el-select v-model="formInline.textbook.titleType" placeholder="请选择">
                                                <el-option
                                                        v-for="item in title_option"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12" :push=2>
                                    <div class="form_col">
                                        <el-form-item label="课程学时数" :label-width="formLabelWidth">
                                            <el-input v-model="formInline.textbook.courseTime" class="input_width" type="number" min="0"></el-input>
                                        </el-form-item>
                                        <el-form-item label="出版单位" :label-width="formLabelWidth" prop="publisher">
                                            <el-input v-model="formInline.textbook.publisher" class="input_width"></el-input>
                                        </el-form-item>
                                        <el-form-item label="出版时间" :label-width="formLabelWidth">
                                            <el-date-picker
                                                    v-model="formInline.textbook.titleDate"
                                                    type="month"
                                                    placeholder="201X年X月"
                                                    value-format="yyyy-MM">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="书号ISBN" :label-width="formLabelWidth">
                                            <el-input v-model="formInline.textbook.isbn" class="input_width"></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否为近三年优质教材" :label-width="formLabelWidth">
                                            <el-switch
                                                    v-model="formInline.textbook.flag"
                                                    active-color="#339999"
                                                    inactive-color="#ff4949">
                                            </el-switch>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="Class">
                        <h3 class="title">开课班级</h3>
                        <div id="Class_table">
                            <el-table
                                    :data="tableData"
                                    :header-cell-style="tableHeaderColor">
                                <el-table-column
                                        label="年级"
                                        width="80">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.grade"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="专业、班级">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.subject"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="人数"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.number" type="number" min="0"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="必(选)修"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.classType" placeholder="请选择">
                                            <el-option
                                                    v-for="item in classType_option"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="开课时间"
                                        width="160">
                                    <template slot-scope="scope">
                                        <el-date-picker
                                                v-model="scope.row.date"
                                                type="date"
                                                placeholder="选择日期"
                                                size="large"
                                                value-format="yyyy-MM-dd">
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="开课学期"
                                        width="130">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.semester" placeholder="请选择">
                                            <el-option
                                                    v-for="item in semester_option"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="160">
                                    <template slot-scope="scope">
                                            <el-button
                                                    size="mini"
                                                    type="danger"
                                                    :class="[scope.row.flag? '':'delete_button']"
                                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                        <el-button
                                                size="mini"
                                                type="primary"
                                                @click="handleaddLine(scope.$index)"
                                                v-if="scope.row.flag">新增</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div id="foot">
                        <el-card class="box-card" shadow="always">
                            <div slot="header" class="clearfix">
                                <h3>填报说明</h3>
                            </div>
                            <div v-for="(item, index) in tips">
                                {{index+1}}、{{item}}
                            </div>
                        </el-card>
                        <div class="foot_form">
                            <el-form :inline="true" :model="formInline">
                                <el-form-item label="联系电话">
                                    <el-input v-model="formInline.textbook.phone" class="input_width" placeholder="教师联系电话"></el-input>
                                </el-form-item>
                                <el-checkbox v-model="checked">本人已阅读申报相关说明</el-checkbox>
                                <div class="summit_button">
                                    <el-button type="primary" round @click="submit('formInline')" :disabled="!checked">提交申请</el-button>
                                    <el-button type="info" round @click="save('formInline')" :disabled="!checked">保存申请</el-button>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>

            </div>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    import axios from 'axios'
    export default {
        name: "ApplicationForm",
        mounted(){
            if (this.$route.params.id !== '-1'){
                this.route_params.id = this.$route.params.id;
                this.route_params.status = this.$route.params.status;
                if (this.$route.params.status === '1'){
                    if(this.route_params.id !== undefined){
                        axios.get('teacher/findtextbook/' + this.route_params.id)
                            .then(res => {
                                console.log('update', res);
                                this.formInline.textbook = res.data.data.textbook;
                                this.formInline.textbook.flag = this.formInline.textbook.flag === 'true';
                                this.formInline.textbook.id = this.route_params.id;
                                this.tableData = res.data.data.class;
                                if (this.tableData.length === 0){
                                    this.tableData = [{
                                        grade:'',
                                        subject: '',
                                        number: '',
                                        classType:'',
                                        date: '',
                                        flag: true
                                    }];
                                }
                                this.tableData[this.tableData.length-1].flag = true;
                            })
                    }
                }else{
                    axios.get('main/book/' + this.route_params.id)
                        .then(res => {
                            console.log("book_info:", res);
                            this.formInline.textbook = res.data.data;
                        })
                }
            }
        },
        data(){
            const validateNull = (rule, value, callback) => {
                if(this.formInline.textbook[rule.field] === ''){
                    if (rule.field === 'courseNAME'){
                        callback("请输入课程名称");
                    }else if(rule.field === 'titleName'){
                        callback("请输入教材名称");
                    }else if(rule.field === 'publisher'){
                        callback("请输入出版社名称");
                    }
                } else {
                    callback();
                }
            };
            return {
                formLabelWidth: '100px',
                route_params:{
                    id: '',
                    status: ''
                },
                formInline:{
                    textbook: {
                        courseName: '',
                        courseTime: '',
                        titleName: '',
                        publisher: '',
                        author: '',
                        titleDate: '',
                        version: 1,
                        isbn: '',
                        titleType: '',
                        flag: true,
                        phone: '',
                        status: '',
                        classList: [],
                        teacherId: ''
                    }
                },
                tableData: [{
                    grade:'',
                    subject: '',
                    number: '',
                    classType:'',
                    date: '',
                    flag: true
                }],
                title_option:[{
                    value: '教育部国家级规划教材',
                    label: '教育部国家级规划教材'
                }, {
                    value: '省部级规划教材',
                    label: '省部级规划教材'
                }, {
                    value: '教育部国家级精品教材',
                    label: '教育部国家级精品教材'
                }, {
                    value: '省部级精品教材',
                    label: '省部级精品教材'
                }, {
                    value: '无',
                    label: '无'
                }],
                classType_option:[{
                    value: '必修',
                    label: '必修'
                }, {
                    value: '选修',
                    label: '选修'
                }],
                semester_option:[{
                    value: '第一学期',
                    label: '第一学期'
                }, {
                    value: '第二学期',
                    label: '第二学期'
                }],
                tips:['近三年出版的优质教材：指近三年出版的省部级以上（含省部级）规划教材、重点推荐教材、精品教材等优质教材。',
                    '出版日期需严格按照范例格式填写，经过多版修订的教材填s写最近一次出版的日期。',
                    '仅供教师使用的教师参考用书另表征订，并标明教师用书字样。'
                ],
                checked: false,
                rules:{
                    courseNAME: [
                        { required: true,  validator: validateNull, trigger: 'blur' },
                    ],
                    titleName: [
                        { required: true, validator: validateNull, trigger: 'blur' }
                    ],
                    publisher: [
                        { required: true, validator: validateNull, trigger: 'blur' }
                    ],

                }
            }
        },
        methods: {
            tableHeaderColor({rowIndex}) {
                if (rowIndex === 0) {
                    return 'background-color: #339999;color: #fff;font-weight: 700; text-align: center;'
                }
            },
            handleDelete(index){
                if (this.tableData.length !== 1){
                    this.tableData.splice(index, 1)
                }
                if (this.tableData[this.tableData.length - 1].flag !== true){
                    this.tableData[this.tableData.length - 1].flag = true
                }
            },
            handleaddLine(index){
                const newline = {
                    grade:'',
                    subject: '',
                    number: '',
                    classType:'',
                    date: '',
                    flag: true
                };
                this.$set(this.tableData[index], 'flag', false);
                this.tableData.push(newline);
            },
            submit(formName){
                this.valid(formName, 0);
                this.formInline.textbook.status = 2;

            },
            save(formName) {
               this.valid(formName, 1);
               this.formInline.textbook.status = 1;
            },
            valid(formName, flag){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       /* alert('submit!');*/
                        if(flag === 0) {
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                            setTimeout(() =>{
                                this.$router.push('/teacher/unchecked')
                            },1200)
                        }
                        else {
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                            setTimeout(() =>{
                                this.$router.push('/teacher/waitingsubmit')
                            },1200)
                        }
                        if (this.$route.params.status === undefined || this.$route.params.status === '0'){
                            this.send_create_request();
                        }else{
                            this.send_update_request()
                        }
                    } else {
                        if(flag === 0) {
                            this.$message({
                                type: 'error',
                                message: '提交失败'
                            });
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: '保存失败'
                            });
                        }
                        return false;
                    }
                });
            },
            send_create_request(){
                this.formInline.textbook.teacherId = JSON.parse(sessionStorage.getItem("user")).id;
                axios.post('/teacher/saveclass',this.tableData)
                    .then(res => {
                        console.log('create_class:',res);
                        this.formInline.textbook.classList = res.data;
                        axios.post('/teacher/savetextbook', this.formInline.textbook)
                            .then(res => {
                                console.log('create_textbook',res);
                            })
                    })
            },
            send_update_request(){
                this.formInline.textbook.teacherId = JSON.parse(sessionStorage.getItem("user")).id;
                this.formInline.textbook.status = "2";
                axios.post('/teacher/saveclass',this.tableData)
                    .then(res => {
                        console.log('update_class:',res);
                        this.formInline.textbook.classList = res.data;
                        axios.put('/teacher/textbook', this.formInline.textbook)
                            .then(res => {
                                console.log('update_textbook',res);
                            })
                    })
            }
        },
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
    .Class .title{
        font-size: 40px;
    }
    #Class_table{
        width: 80%;
        margin: 10px auto;
    }
    #Class_table  .el-date-editor.el-input{
        width: 100%;
    }
    .delete_button{
        margin-left: 32%;
    }
    #foot{
        width: 70%;
        margin: 10px auto;
        position: relative;
    }
    .box-card{
        width: 50%;
        display: inline-block;
    }
    .foot_form{
        width: 40%;
        display: inline-block;
        position: absolute;
        top: 30px;
        right: 0;
    }
    .foot_form .input_width{
        width: 100%;
        margin-bottom: 20px;
    }
    .summit_button{
        margin-top: 40px;
    }
</style>