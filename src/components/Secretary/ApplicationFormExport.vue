<template>
    <Main>
        <template>
            <div>
                <h1 class="title">任务管理</h1>
                <div class="tabwidth">
                    <el-tabs type="border-card" stretch="true" >
                        <el-tab-pane label="学院">
                            <el-form :inline="true" :model="formInline" class="mar">
                                <el-row>
                                    <el-col span="5" offset="14">
                                        <el-button type="primary" icon="el-icon-s-tools" >启动任务</el-button>
                                    </el-col>
                                    <el-col span="5">
                                        <el-button type="danger" icon="el-icon-warning" >停止任务</el-button>
                                    </el-col>
                                </el-row>
                            </el-form>

                            <el-table
                                    :data="tableData"
                                    style="width: 80%; margin-top: 30px; margin-left: 11%">
                                <el-table-column  width="26" align="center">
                                    <el-checkbox></el-checkbox>
                                </el-table-column>
                                <el-table-column label="学院名称" width="350" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="学院人数" width="250" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                                type="primary"
                                                size="mini"
                                                @click="handleEdit(scope.$index, scope.row)">启动任务
                                        </el-button>
                                        <el-button
                                            type="danger"
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">停止任务
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="page">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="page.total"
                                        :current-page.sync="req.page"
                                        @prev-click="prev"
                                        @next-click="next"
                                        @current-change="current">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="个人">
                            <el-form :inline="true" :model="formInline" class="mar">
                                <el-row >
                                    <el-col span="14">
                                        <el-col span="13">
                                            <el-form-item label="教师名称">
                                                <el-input v-model="formInline.user" placeholder="请输入教师名称"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col span="11">
                                            <el-form-item>
                                                <el-select v-model="formInline.region" placeholder="请选择学院">
                                                    <el-option label="电子信息学院" value="shanghai"></el-option>
                                                    <el-option label="机电工程学院" value="beijing"></el-option>
                                                    <el-option label="计算机学院" value="shanghai"></el-option>
                                                    <el-option label="材料与食品学院" value="beijing"></el-option>
                                                    <el-option label="人文社会科学学院" value="shanghai"></el-option>
                                                    <el-option label="管理学院" value="beijing"></el-option>
                                                    <el-option label="经贸学院" value="shanghai"></el-option>
                                                    <el-option label="外国语学院" value="beijing"></el-option>
                                                    <el-option label="艺术设计学院" value="shanghai"></el-option>
                                                    <el-option label="马克思主义学院" value="beijing"></el-option>
                                                    <el-option label="体育部" value="shanghai"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>

                                    </el-col>
                                    <el-col span="10">
                                        <el-col span="10" >
                                            <el-form-item>
                                                <el-select v-model="formInline.region" placeholder="请选择状态">
                                                    <el-option label="全部" value="all"></el-option>
                                                    <el-option label="已启动" value="up"></el-option>
                                                    <el-option label="停止" value="stop"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col span="6">
                                            <el-button  type="primary" icon="el-icon-s-tools" >启动任务</el-button>
                                        </el-col>
                                        <el-col span="6" offset="2">
                                            <el-button  type="danger" icon="el-icon-warning" >停止任务</el-button>
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </el-form>

                            <el-table
                                    :data="tableData"
                                    style="width: 80%; margin-top: 30px; margin-left: 11%">
                                <el-table-column  width="26" align="center">
                                    <el-checkbox></el-checkbox>
                                </el-table-column>
                                <el-table-column label="教师名称" width="200" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工号" width="230" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="学院" width="300" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                                type="primary"
                                                size="mini"
                                                @click="handleEdit(scope.$index, scope.row)">启动任务
                                        </el-button>
                                        <el-button
                                                type="danger"
                                                size="mini"
                                                @click="handleEdit(scope.$index, scope.row)">停止任务
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="page">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="page.total"
                                        :current-page.sync="req.page"
                                        @prev-click="prev"
                                        @next-click="next"
                                        @current-change="current">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </template>
    </Main>
</template>

<script>
    import Main from '../Main'
    import axios from 'axios'
    export default {
        name: "ApplicationFormExport",
        components: {
            Main
        },
        mounted(){
            this.user.realName = JSON.parse(sessionStorage.getItem("user")).college;
            this.college_id = this.collegeName.indexOf(this.user.realName, 0) + 1;
            console.log(this.college_id);
            axios.get('secretary/college/' + this.college_id + '?page=' + this.req.page + '&size=' +  this.req.size)
                .then(res =>{
                    console.log(res);
                    this.tableData = res.data.data.list;
                    this.page.total = res.data.data.total;
                });
            this.realName = JSON.parse(sessionStorage.getItem("user")).realName;
        },
        data(){
            return {

                centerDialogVisible: false,
                formInline: {
                    user: '',
                    region: ''
                },
                user:{
                    realName: ''
                },
                tableData: [
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                ],
                req: {
                    page: 1,
                    size: 10
                },
                page:{
                    total: 0
                },
                collegeName:['电子信息学院' , '机电工程学院', '计算机学院', '材料与食品学院', '人文社会科学学院', '管理学院', '经贸学院', '外国语学院', '艺术设计学院', '马克思主义学院', '体育部'],


            }
        },
        methods: {

            handleEdit(index, row) {
                this.$router.push('applicationform/' + this.tableData[index].id)
            },
            handleDelete(index){
                this.$confirm('此操作将永久删除该申请表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('/teacher/' + this.tableData[index].id)
                        .then(res => {
                            if (this.tableData.length !== 1){
                                this.tableData.splice(index, 1);
                            }
                            if (this.tableData[this.tableData.length - 1].flag !== true){
                                this.tableData[this.tableData.length - 1].flag = true
                            }
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(error =>{
                        this.$message({
                            type: 'success',
                            message: '删除失败!'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            prev(){
                this.req.page -= 1;
            },
            next(){
                this.req.page += 1;
            },
            current(){
                console.log('current:',this.req.page);
                this.page_request();
            },
            page_request(){
                axios.get('secretary/college/' + this.college_id + '?page=' + this.req.page + '&size=' +  this.req.size)
                    .then(res =>{
                        console.log('getall:',res);
                        this.tableData = res.data.data.list;
                        this.page.total = res.data.data.total;
                    });
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
        margin-bottom: 20px;
    }
    .tip .el-tag{
        font-size: 20px;
        height: 40px;
        line-height: 40px;
        font-family: '华文彩云';
    }
    .page{
        margin-top: 20px;
        text-align: center;
    }
    .mar {
        width: 80%;
        margin: 0 auto;
        padding-top: 1%;
    }
    .tabwidth {
        width: 80%;
        margin: 0 auto;
    }
</style>