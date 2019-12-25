import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Teacher from '../views/Teacher'
import Secretary from '../views/Secretary'
import ApplicationForm from '../components/Teacher/ApplicationForm'
import Checked from "../components/Teacher/Checked";
import History from "../components/Teacher/History";
import Home from "../components/Teacher/Home";
import UnChecked from "../components/Teacher/UnChecked";
import WaitingSubmit from "../components/Teacher/WaitingSubmit";
import ApplicationFormCheck from "../components/Secretary/ApplicationFormCheck";
import ApplicationFormExport from "../components/Secretary/ApplicationFormExport";
import SHistory from "../components/Secretary/SHistory";
import UserManagement from "../components/Secretary/UserManagement";
import SHome from "../components/Secretary/Home"
import No_found from "../views/404"
Vue.use(VueRouter);

const routes = [
    {
      path: '',
      redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/teacher',
        meta:{requireAuth:true},
        component: Teacher,
        children:[
            {
                path: '',
                redirect: 'home'
            },
            {
                path: 'home',
                name: 'home',
                component: Home
            },
            {
                path: 'applicationform/:status/:id',
                name: 'applicationform',
                component: ApplicationForm
            },
            {
                path: 'waitingsubmit',
                name: 'waitingsubmit',
                component: WaitingSubmit
            },
            {
                path: 'checked',
                name: 'checked',
                component: Checked
            },
            {
                path: 'unchecked',
                name: 'unchecked',
                component: UnChecked
            },
            {
                path: 'history',
                name: 'history',
                component: History
            }
        ]
    },
    {
      path: '/secretary',
      component: Secretary,
        meta:{requireAuth:true},
      children:[
            {
                path: '',
                redirect: 's_home'
            },
            {
                path: 's_home',
                name: 's_home',
                component: SHome
            },
            {
                path: 'applicationformcheck',
                name: 'applicationformcheck',
                component: ApplicationFormCheck
            },
            {
                path: 'applicationformexport',
                name: 'applicationformexport',
                component: ApplicationFormExport
            },
            {
                path: 's_history',
                name: 's_history',
                component: SHistory
            },
            {
                path: 'usermanagement',
                name: 'usermanagement',
                component: UserManagement
            }
        ]
    },
    {
        path: "*",
        component: No_found
    }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
/**
  *  路由 守卫 函数
  */
router.beforeEach((to, from, next)=> {
    let token  = sessionStorage.getItem('token');
    if(to.matched.some(r => r.meta.requireAuth)){
        if(token){
            next();
        }else{
            next('/');
        }
    }else{
        next();
    }
});
export default router
