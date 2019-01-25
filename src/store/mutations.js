//import * as types from './mutation-types'

export default {
  changeProfile(state,opt){
    state.profile.id         = opt.id
    state.profile.username   = opt.login
    state.profile.avatar_url = opt.avatar_url
    state.profile.created_at = opt.created_at
  },
  changeSysRole(state,opt){
    state.sysRole=opt.list
    state.subMenuList=opt.list[0]
  },
  changeSubMenuList(state,opt){
    state.subMenuList= state.sysRole.filter(item=> item.name== opt.name)
  }
}
