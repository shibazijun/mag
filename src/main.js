// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// use es6 syntax and api
import 'babel-polyfill'

// use element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//自定义CSS
import './assets/common/app.css'

// use vue-router
import VueRouter from 'vue-router'

// use lodash  数组、对象、字符串等一些工具方法
import _ from 'lodash'

// use moment  //日期处理工具
import moment from 'moment'

// 安装图标字体库
// import 'font-awesome/css/font-awesome.min.css'

// register global filter
import '@/utils/filters'

//自定义工具
import Utile from './utils/tools'
Vue.use(Utile)

// use vuex
import store from './store'




// use public.less to enable index.html
import './assets/common/public.less'


// use axios
import {post,fetch,patch,put} from './utils/requestApi.js'
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

// Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

import '@/utils/permission'


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
