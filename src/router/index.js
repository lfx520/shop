import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import Welcome from '../components/welcome'
import Users from '../components/user/users'
import Rights from '../components/power/rights'
import Roles from '../components/power/roles'
// 导入全局样式表  
import '../assets/css/global.css'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home',
    component: Home,
    redirect: '/Welcome',//重定向
    children: [
      { path: '/home', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      
    ] }
  ]

    
})
