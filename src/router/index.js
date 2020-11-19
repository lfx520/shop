import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/pages/Home'
import Blog from '@/components/pages/Blog' //引入组件


=======
import Login from '../components/login'
import Home from '../components/home'
import Welcome from '../components/welcome'
import Users from '../components/user/users'
// 导入全局样式表  
import '../assets/css/global.css'
>>>>>>> user
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/home', //http://localhost:8080/#/
    	name: 'Home',
    	component: Home
    },
    {
<<<<<<< HEAD
    	path: '/blog', //http://localhost:8080/#/blog
    	name: 'Blog',
    	component: Blog
    },
=======
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
>>>>>>> user
  ]
})
