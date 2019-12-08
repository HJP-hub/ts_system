<template>
    <Main>
        <template>
            <div>
                <h1 class="title">待审核申请表</h1>
                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%">
                    <el-table-column label="课程名称" width="220" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.className}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材名称" width="220" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.bookName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出版时间" width="220" align="center">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.publicDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请时间" width="220" align="center">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.applyDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleLook(scope.$index, scope.row)">详情</el-button>
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
        name: "UnChecked",
        components: {
            Main
        },
        data() {
            return {
                a:'hello',
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
                    }]
            }
        },
        methods: {
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
</style>