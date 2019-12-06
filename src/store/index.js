import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      realName: '',
      college: '',
      jobNumber: '',
      sex: '',
      phone: '',
      email: '',
      userType: '',
      id: '',
      pass: '',
      checkPass: '',
      visible: false,
      userName: '',
      userPassword: ''
    }
  },
  mutations: {
    setUser(state, res){
      if (res.data.data.userType === 1){
        state.user.userType = '教师';
      }
      else if (res.data.data.userType === 2){
        state.user.userType = '秘书';
      }
      state.user.realName = res.data.data.realName;
      state.user.college = res.data.data.college;
      state.user.jobNumber = res.data.data.jobNumber;
      if (res.data.data.sex === '1'){
        state.user.sex = '男';
      }else{
        state.user.sex = '女';
      }
      state.user.phone = res.data.data.phone;
      state.user.email = res.data.data.email;
      state.user.id = res.data.data.id;
      state.user.userName = res.data.data.userName;
      state.user.userPassword = res.data.data.userPassword;
    }
  },
  actions: {
  },
  modules: {
  }
})
