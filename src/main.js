// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入表格树
//import TreeTable from 'vue-table-with-tree-grid'
import TreeTable from 'vue-table-with-tree-grid'

//Vue.use(ZkTable)
Vue.component('tree-table',TreeTable)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;
//Vue.component('zk-table', TreeTable)

//import less from 'less'
//导入element
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
//单独导入message
import { Message } from 'element-ui'
//单独导入MessageBox 
import { MessageBox } from 'element-ui'

//导入字体图标
import './assets/fonts/iconfont.css'
//导入进度条包及相应的样式
import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'

// import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 在request 拦截器中, 展示进度条 NProgress.start()
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
//用进度条可以避免post404的出现
axios.interceptors.request.use(config => {
  NProgress.start()
  //console.log(config)
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// response 拦截器中,  隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$http = axios

//Vue.prototype.$message = Message;
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
//Vue.use(less)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
