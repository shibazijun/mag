import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import sys1 from '@/router/sys1/index'
import sys2 from '@/router/sys2/index'
import sys3 from '@/router/sys3/index'
import sys4 from '@/router/sys4/index'
import sys5 from '@/router/sys5/index'
import welcome from '@/router/welcome'
import notefound from '@/router/notefound'

var routerlist= sys1.concat(sys2,sys3,sys4,sys5)

var must = welcome.concat(notefound)

export default new Router({
  mode: 'history',
  routes: must
})
