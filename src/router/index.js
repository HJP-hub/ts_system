import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Teacher from '../views/Teacher'
import Secretary from '../views/Secretary'
import ShowInformation from "../components/Teacher/ShowInformation"
import ApplicationForm from '../components/Teacher/ApplicationForm'
import Checked from "../components/Teacher/Checked";
import History from "../components/Teacher/History";
import Home from "../components/Teacher/Home";
import ModifyInformation from "../components/Teacher/ModifyInformation";
import UnChecked from "../components/Teacher/UnChecked";
import WaitingSubmit from "../components/Teacher/WaitingSubmit";


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
                path: 'applicationform',
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
            },
            {
                path: 'showinformation',
                name: 'showinformation',
                component: ShowInformation
            },
            {
                path: 'modifyinformation',
                name: 'modifyinformation',
                component: ModifyInformation
            }
        ]
    },
    {
      path: '/secretary',
      component: Secretary
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
