<template>
    <Main>
        <template>
            <div>
                <h1 class="title">待提交申请表</h1>
                <el-table
                        :data="tableData"
                        style="width: 80%; margin-top: 30px; margin-left: 11%">
                    <el-table-column label="课程名称" width="260" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">云计算</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="教材名称" width="260" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">云计算原理与实践</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出版单位" width="260" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">人民邮电出版社</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="260" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px"><el-tag type="info">待提交</el-tag></span>
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
                tableData: [{

                },
                ]
            }
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