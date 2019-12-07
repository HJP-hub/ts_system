import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      user: {
          user: {
            realName: '',
            college: '',
            jobNumber: '',
            sex: '',
            phone: '',
            email: '',
            userType: '',
            id: '',
            userName: '',
            userPassword: ''
          },
          other:{
            pass: '',
            checkPass: '',
            visible: false,
          },
      },
      TAppForm:{
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
          teacherId: ''
        },
        tableData: [{
          grade:'',
          subject: '',
          number: '',
          classType:'',
          date: '',
          flag: true
        }]
      }
  },
  mutations: {
    setUser(state, res){
      if (res.data.data.userType === 1){
        state.user.user.userType = '教师';
      }
      else if (res.data.data.userType === 2){
        state.user.user.userType = '秘书';
      }
      state.user.user.realName = res.data.data.realName;
      state.user.user.college = res.data.data.college;
      state.user.user.jobNumber = res.data.data.jobNumber;
      state.user.user.sex =  res.data.data.sex;
      state.user.user.phone = res.data.data.phone;
      state.user.user.email = res.data.data.email;
      state.user.user.id = res.data.data.id;
      state.user.user.userName = res.data.data.userName;
      state.user.user.userPassword = res.data.data.userPassword;
    }
  },
  actions: {
  },
  modules: {
  }
})
