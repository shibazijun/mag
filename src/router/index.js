import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import sys1 from '@/router/sys1/index'
import sys2 from '@/router/sys2/index'
import welcome from '@/router/welcome'
import notefound from '@/router/notefound'

var routelist= welcome.concat(sys1,sys2,notefound)

export default new Router({
  mode: 'history',
  routes: routelist
})
