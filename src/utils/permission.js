import router from '../router'
import store from '../store'

import Nprogress from 'nprogress' //进度条
import 'nprogress/nprogress.css'

import { Message,MessageBox } from 'element-ui'

// handle admin, should release
router.beforeEach((to,from,next) => {
  Nprogress.start()
  //如果访问登录入口
  if(to.path == '/login'){
    sessionStorage.removeItem('user');  //清除用户信息
    next()
  }else{
    let user = JSON.parse(sessionStorage.getItem('user'));
    
    if(!user && to.path != '/login'){
      router.push({
        path: '/login',
        query: {
          redirect: to.path.slice(1)
        }
      })
    } else{
      if(!store.state.sysRole.length){ //如果用户没有系统权限则去拉取用户
          store.dispatch('getuserInfo',{user})
          .then( data => {
            router.addRoutes(store.state.sysRole)
          })
        next()
      }
      next()
    }
  }
})

router.afterEach(()=>{
  Nprogress.done()
})
