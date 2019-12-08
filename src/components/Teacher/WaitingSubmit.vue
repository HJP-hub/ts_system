<template>
    <Main>
        <template>
            <div>
                <h1 class="title">待提交申请表</h1>
                <div class="tip">
                    <el-tag >
                        <i class="el-icon-s-flag"></i>
                        <span>{{teachername}}教师，您共有{{tablenum}}张待提交的申请表，请尽快编辑完成它们，或者删除它们</span>
                    </el-tag>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%">
                    <el-table-column label="课程名称" width="260" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.courseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材名称" width="260" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.titleName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出版单位" width="260" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.publisher}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保存时间" width="160" align="center">
                        <template slot-scope="scope">
                            <el-tag type="info">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    export default {
        name: "WaitingSubmit",
        components: {
            Main
        },
        data(){
            return {
                teachername: '张三',
                tablenum: 3,
                tableData: [{
                    courseName: '云计算',
                    titleName: '云计算原理与实践',
                    publisher: '人民邮电出版社',
                    date: '2019-12-7'
                },
                {
                    courseName: '云计算',
                    titleName: '云计算原理与实践',
                    publisher: '人民邮电出版社',
                    date: '2019-12-7'
                },
                {
                    courseName: '云计算',
                    titleName: '云计算原理与实践',
                    publisher: '人民邮电出版社',
                    date: '2019-12-7'
                },
                {
                    courseName: '云计算',
                    titleName: '云计算原理与实践',
                    publisher: '人民邮电出版社',
                    date: '2019-12-7'
                }]
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
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
    .tip {
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
    }
</style>