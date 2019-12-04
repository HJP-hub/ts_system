import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      age: '',
      job_number: '',
      sex: '',
      phone: '',
      email: ''
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
