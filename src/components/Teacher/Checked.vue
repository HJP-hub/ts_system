<template>
    <Main>
        <template>
            <div>
                <h1 class="title">已审核申请表</h1>
                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%">
                    <el-table-column label="课程名称" width="210" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.className}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材名称" width="210" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.bookName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出版时间" width="210" align="center">
                        <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.publicDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请时间" width="210" align="center">
                        <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.applyDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="处理时间" width="210" align="center">
                        <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.disposeDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleLook(scope.$index, scope.row)">查看</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog
                    title="申请表信息"
                    :visible.sync="dialogVisible"
                    width="40%"
                    style="min-width: 586px"
                    center
                    :before-close="handleClose">

                <el-row>
                    <el-col :span="10" offset="4"><div class="applyTableShow">
                    <p class="marginTop">课程名称: {{tableData[0].className}}</p>
                    <p class="marginTop">教材名称:</p>
                    <p class="marginTop">编（著）者:</p>
                    <p class="marginTop">版次:</p>
                    <p class="marginTop">教材类型:</p>
                    </div>
                    </el-col>
                    <el-col :span="10"><div class="applyTableShow" >
                    <p class="marginTop">课程学时数: </p>
                    <p class="marginTop">出版单位:</p>
                    <p class="marginTop">出版时间:</p>
                    <p class="marginTop">书号ISBN:</p>
                    <p class="marginTop">是否为近三年优质教材:</p>
                    </div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" offset="3">
                        <div class="applyTableShow">
                            <div class="Class">
                                <el-col :span="20" offset="1">
                                    <h3 class="tableTitle">开课班级</h3>
                                </el-col>
                                <div id="Class_table">
                                    <el-table
                                            :data="tableData2"
                                            :header-cell-style="tableHeaderColor">
                                        <el-table-column
                                                label="年级"
                                                width="80">
                                        </el-table-column>
                                        <el-table-column
                                                label="专业、班级"
                                                width="110">
                                        </el-table-column>
                                        <el-table-column
                                                label="人数"
                                                width="80">
                                        </el-table-column>
                                        <el-table-column
                                                label="开课时间"
                                                width="90">
                                        </el-table-column>
                                        <el-table-column
                                                label="必(选)修"
                                                width="90">
                                        </el-table-column>
                                        <el-table-column
                                                label="开课学期"
                                                width="90">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" offset="4">
                        <div class="applyTableShow">
                            <p class="marginTop">教师:</p>
                            <p class="marginTop">申请时间:</p>
                            <p class="marginTop">审评意见:</p>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="applyTableShow" >
                            <p class="marginTop">联系电话:</p>
                            <p class="marginTop">审核时间:</p>
                            <p class="marginTop">审核人:</p>
                        </div>
                    </el-col>
                </el-row>

            </el-dialog>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    export default {
        name: "Checked",
        components: {
            Main
        },
        data() {
            return {
                    dialogVisible: false,
                    tableData: [{
                        className: '云计算1',
                        bookName: '云计算原理与实践1',
                        publicDate: '2019-12-8',
                        applyDate: '2019-12-8',
                        disposeDate:'2019-12-8'
                    },
                    {
                        className: '云计算2',
                        bookName: '云计算原理与实践2',
                        publicDate: '2019-12-8',
                        applyDate: '2019-12-8',
                        disposeDate:'2019-12-8'
                    },
                    {
                        className: '云计算3',
                        bookName: '云计算原理与实践3',
                        publicDate: '2019-12-8',
                        applyDate: '2019-12-8',
                        disposeDate:'2019-12-8'
                    },
                    {
                        className: '云计算4',
                        bookName: '云计算原理与实践4',
                        publicDate: '2019-12-8',
                        applyDate: '2019-12-8',
                        disposeDate:'2019-12-8'
                    }],
                tableData2: [],
            }
        },
        methods: {
            tableHeaderColor({rowIndex}) {
                if (rowIndex === 0) {
                    return 'background-color: cadetblue;color: #fff;font-weight: 600; text-align: center;'
                }

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleLook(index, row) {
                /*console.log(index, row);*/
                this.dialogVisible = true;
            },
            handleDelete(index){
                this.$confirm('此操作将永久删除该申请表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.tableData.length !== 1){
                        this.tableData.splice(index, 1)
                    }
                    if (this.tableData[this.tableData.length - 1].flag !== true){
                        this.tableData[this.tableData.length - 1].flag = true
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
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
    .tableTitle {
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        margin-top: 60px;
        margin-bottom: 30px;
    }
    .applyTableShow {
        color: #838383;
        font-size: 15px;
    }
    .marginTop {
        margin-top: 30px;
    }
    #Class_table{
        width: 100%;
        margin: 10px auto;

    }


</style>