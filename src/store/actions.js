import {post,fetch,patch,put} from '@/utils/requestApi.js'  //请求方法
import { rolRoute } from '@/router/index' //路由信息
import apiPath from '@/utils/apiPath'   //api接口


function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * * @param asyncRouterMap
 * * @param roles
 **/
function filterRouter(asyncRouterMap, roles) {
  roles= roles.sort((a,b)=> Number(a)-Number(b))
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}


export default {
  getuserInfo(store,parms){
    return new Promise((resolve,reject) => {
      fetch(apiPath.USER_INFO+'/'+ parms.user)
      .then(data => {
          console.log(data)
          let accessRouter=[]
          if(data.type == 'admin'){ //如果是Admin
             accessRouter = rolRoute
          }else{
            accessRouter= filterRouter(rolRoute, ['1000','1101','1102','1100','2000','2100','2101','2102','2103'])
          }
          store.commit('changeProfile',data)  //同步用法
          store.commit('changeSysRole',{list:accessRouter})  //同步用法
          resolve(accessRouter)
      })
      .catch(error => {
        reject(error);
      })
      
      
    })
    
    
    
  }
}
