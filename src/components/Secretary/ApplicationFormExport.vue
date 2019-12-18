<template>
    <Main>
        <template>
            <div>
                <h1 class="title">任务管理</h1>
                <div class="tabwidth">
                    <el-tabs type="border-card" stretch>
                        <el-tab-pane label="学院">
                            <el-table
                                    :data="college_info"
                                    class="college_table">
                                <el-table-column label="学院名称" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.collegeName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="学院人数" width="250" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.totalNumber}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" width="300">
                                    <template slot-scope="scope">
                                        <el-button
                                                type="primary"
                                                size="mini"
                                                @click="handleOperateC(scope.$index, 1)">启动任务
                                        </el-button>
                                        <el-button
                                            type="danger"
                                            size="mini"
                                            @click="handleOperateC(scope.$index, 0)">停止任务
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="个人">
                            <el-row class="mar">
                                <el-col :span="14">
                                    <el-col :span="12">
                                        <el-select v-model="req.college_id" placeholder="请选择学院" @change="teacher_request">
                                            <el-option label="全部" value="0"></el-option>
                                            <el-option label="电子信息学院" value="1"></el-option>
                                            <el-option label="机电工程学院" value="2"></el-option>
                                            <el-option label="计算机学院" value="3"></el-option>
                                            <el-option label="材料与食品学院" value="4"></el-option>
                                            <el-option label="人文社会科学学院" value="5"></el-option>
                                            <el-option label="管理学院" value="6"></el-option>
                                            <el-option label="经贸学院" value="7"></el-option>
                                            <el-option label="外国语学院" value="8"></el-option>
                                            <el-option label="艺术设计学院" value="9"></el-option>
                                            <el-option label="马克思主义学院" value="10"></el-option>
                                            <el-option label="体育部" value="11"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-select v-model="req.startTask" placeholder="请选择状态" @change="teacher_request">
                                            <el-option label="全部" value="-1"></el-option>
                                            <el-option label="已启动" value="1"></el-option>
                                            <el-option label="停止" value="0"></el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                                <el-col :span="10" :push="4">
                                    <el-button  type="primary" icon="el-icon-s-tools" @click="handleOperateT(-1,1)">启动任务</el-button>
                                    <el-button  type="danger" icon="el-icon-warning" @click="handleOperateT(-1,0)">停止任务</el-button>
                                </el-col>
                            </el-row>

                            <el-table
                                    :data="teacher_info"
                                    style="width: 80%; margin-top: 30px; margin-left: 11%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column label="教师名称" width="200" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.realName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工号" width="230" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.jobNumber}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="学院" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.college}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                                :plain="true"
                                                type="primary"
                                                size="mini"
                                                @click="handleOperateT(scope.$index,1)"
                                                v-if="scope.row.startTask===0">启动任务
                                        </el-button>
                                        <el-button
                                                type="danger"
                                                size="mini"
                                                @click="handleOperateT(scope.$index,0)"
                                                v-else>停止任务
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
            axios.get('/secretary/college')
                .then(res => {
                    console.log("college_info:",res);
                    this.college_info = res.data.data;
                });
            this.teacher_request();
            this.req.college_id = '';
            this.req.startTask = ''
        },
        data(){
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                user:{
                    realName: ''
                },
                college_info: [],
                teacher_info: [],
                req: {
                    page: 1,
                    size: 10,
                    startTask: -1,
                    college_id: 0,
                    list_id: []
                },
                page:{
                    total: 0
                },
            }
        },
        methods: {
            handleOperateC(index, status){
                  let college_id = this.$store.state.collegeName.indexOf(this.college_info[index], 0) + 1;
                  axios.put('secretary/teacher/' + status + '/' + college_id)
                      .then(res => {
                          if (status){
                              this.$message({
                                  message: '任务启动成功！！！',
                                  type: 'success'
                              });
                              console.log("success start_task:", res)
                          }else{
                              this.$message.warning('任务已停止！！！');
                              console.log("success stop_task:", res)
                          }
                      })
                      .catch(error => {
                          if (status){
                              console.log("error start_task:", error)
                          }else{
                              console.log("error stop_task:", error)
                          }
                      })
            },
            handleOperateT(index, status){
                if (index !== -1){
                    this.req.list_id = [this.teacher_info[index].id];
                }
                axios.put('secretary/teacher/' + status,this.req.list_id)
                    .then(res => {
                        if (status){
                            console.log("success start_task:", res);
                            this.$message({
                                message: '任务启动成功！！！',
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: '任务已停止！！！',
                                type: 'warning'
                            });
                            console.log("success stop_task:", res)
                        }
                        this.teacher_request();
                    })
                    .catch(error => {
                        if (status){
                            console.log("error start_task:", error)
                        }else{
                            console.log("error stop_task:", error)
                        }
                    })
            },
            handleSelectionChange(val) {
                this.req.list_id = val;
                for (let i = 0; i < this.req.list_id.length; i++){
                    this.req.list_id[i] = this.req.list_id[i].id;
                }
            },
            prev(){
                this.req.page -= 1;
            },
            next(){
                this.req.page += 1;
            },
            current(){
                console.log('current:',this.req.page);
                this.teacher_request();
            },
            teacher_request(){
                axios.get('secretary/teacher' + '?page=' + this.req.page + '&size=' +  this.req.size + '&startTask=' + this.req.startTask + '&collegeId=' + this.req.college_id)
                    .then(res =>{
                        console.log('teacher_list:',res);
                        this.teacher_info = res.data.data.list;
                        this.page.total = res.data.data.total;
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
    .college_table{
        width: 80%;
        margin: 30px auto;
    }
    .tabwidth {
        width: 80%;
        margin: 0 auto;
    }
</style>