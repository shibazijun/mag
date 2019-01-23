import Home from '@/views/Home'
export default [
  {
    path: '/',
    name: '项目信息维护',
    component: Home,
    iconCls: 'el-icon-menu',
    children: [
      {
        path: '/baseInfoList',
        name: '项目基础信息表',
        meta: '',
        component: () => import('@/views/member/groundingList')
      },
      {
        path: '/invesInfoList',
        name: '项目投资信息表',
        meta: '',
        component: () => import('@/views/member/groundingDetail')
      },
      {
        path: '/salesInfoList',
        name: '项目工程销售表',
        meta: '',
        component: () => import('@/views/d3/Scatterplot')
      },
      {
        path: '/finList',
        name: '总部融资信息表',
        meta: '',
        component: () => import('@/views/d3/Scatterplot')
      }
    ]
  },
  {
    path: '/',
    name: '项目筛选',
    component: Home,
    iconCls: 'el-icon-edit',
    children: [
      {
        path: '/collectInfo',
        name: '担保信息表',
        meta: '',
        component: () => import('@/views/demo/index')
      }
    ]
  }
]
