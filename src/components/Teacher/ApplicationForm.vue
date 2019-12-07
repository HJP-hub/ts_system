<template>
    <Main>
        <template>
            <div>
                <h1 class="title">电子科技大学中山学院教材选订申请表</h1>
                <div id="form">
                    <div id="text">
                        <el-form :inline="true" :model="formInline" size="medium" label-position="left">
                            <div class="form_col form_fir_col">
                                <el-form-item label="课程名称" :label-width="formLabelWidth">
                                    <el-input v-model="formInline.textbook.courseNAME" class="input_width"></el-input>
                                </el-form-item>
                                <el-form-item label="教材名称" :label-width="formLabelWidth">
                                    <el-input v-model="formInline.textbook.titleName" class="input_width"></el-input>
                                </el-form-item>
                                <el-form-item label="编(著)者" :label-width="formLabelWidth">
                                    <el-input v-model="formInline.textbook.author" class="input_width"></el-input>
                                </el-form-item>
                                <el-form-item label="版次" :label-width="formLabelWidth">
                                    <el-input-number v-model="formInline.textbook.version" :min="1" :max="20"></el-input-number>
                                </el-form-item>
                                <el-form-item label="教材类型" :label-width="formLabelWidth">
                                    <el-select v-model="formInline.textbook.title_type" placeholder="请选择">
                                        <el-option
                                                v-for="item in title_option"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="form_col">
                                <el-form-item label="课程学时数" :label-width="formLabelWidth">
                                    <el-input v-model="formInline.textbook.courseTime" class="input_width"></el-input>
                                </el-form-item>
                                <el-form-item label="出版单位" :label-width="formLabelWidth">
                                    <el-input v-model="formInline.textbook.publisher" class="input_width"></el-input>
                                </el-form-item>
                                <el-form-item label="出版时间" :label-width="formLabelWidth">
                                    <el-date-picker
                                            v-model="formInline.textbook.title_date"
                                            type="month"
                                            placeholder="201X年X月">
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
                                        width="100%">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.grade"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="专业、班级"
                                        width="140">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.subject"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="人数"
                                        width="80">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.number"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="必(选)修"
                                        width="140">
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
                                                size="large">
                                        </el-date-picker>
                                    </template>
                                </el-table-column>

                                <el-table-column label="操作">
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
                                    <el-button type="primary" round @click="submit">提交申请</el-button>
                                    <el-button type="info" round>保存申请</el-button>
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
        data(){
            return {
                formLabelWidth: '100px',
                formInline:{
                    textbook:{
                        courseNAME: '',
                        courseTime: '',
                        titleName: '',
                        publisher: '',
                        author: '',
                        title_date: '',
                        version: 1,
                        isbn: '',
                        title_type: '',
                        flag: true,
                        phone: '',
                        status: '',
                        classList: [],
                        teacherId: this.$store.state.user.user_id
                    }
                },
                title_option:[{
                    value: 'a',
                    label: '教育部国家级规划教材'
                }, {
                    value: 'b',
                    label: '省部级规划教材'
                }, {
                    value: 'c',
                    label: '教育部国家级精品教材'
                }, {
                    value: 'd',
                    label: '省部级精品教材'
                }, {
                    value: 'e',
                    label: '无'
                }],
                tableData: [{
                    grade:'',
                    subject: '',
                    number: '',
                    classType:'',
                    date: '',
                    flag: true
                }],
                classType_option:[{
                    value: '必修',
                    label: '必修'
                }, {
                    value: '选修',
                    label: '选修'
                }],
                tips:['近三年出版的优质教材：指近三年出版的省部级以上（含省部级）规划教材、重点推荐教材、精品教材等优质教材。',
                    '出版日期需严格按照范例格式填写，经过多版修订的教材填s写最近一次出版的日期。',
                    '仅供教师使用的教师参考用书另表征订，并标明教师用书字样。'
                ],
                checked: false
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
                var newline = {
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
            submit(){
                axios.post('/teacher/saveclass',this.tableData)
                    .then(res => {
                        console.log(res);
                        this.formInline.textbook.status = 1;
                        this.formInline.textbook.classList = res.data;
                        console.log(this.formInline.textbook);
                        axios.post('/teacher/savetextbook', this.formInline.textbook)
                            .then(res => {
                                console.log(res);
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
        width: 70%;
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