import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import Welcome from '../components/welcome'
import Users from '../components/user/users'
// 导入全局样式表  
import '../assets/css/global.css'
Vue.use(Router)

const router = new Router({
  routes: [
    {path:'/',redirect:'/login'},//路由重定向
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect:'/welcome',//重定向到welcome
      children:[
        {
          path: '/welcome',
          name: 'welcome',
          component: Welcome,
        },
        {
          path:'/users',
          name:'users',
          component:Users
        }

      ]
    }
  ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to将要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数，表示放行
  //    1. next() 放行    2. next('/login') 强制跳转

  if (to.path === '/login') {return next();}
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr){return next('/login');}
  next();
})
export default router