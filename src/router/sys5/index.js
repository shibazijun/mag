import Home from '@/views/Home'
export default [
  {
    path: '/',
    name: '资料归档',
    component: Home,
    iconCls: 'el-icon-menu',
    children: [
      {
        path: '/groundingList',
        name: '资料查询',
        meta: '',
        component: () => import('@/views/member/groundingList')
      },
      {
        path: '/groundingDetail',
        name: '复核',
        meta: '',
        component: () => import('@/views/member/groundingDetail')
      }
    ]
  },
  {
    path: '/',
    name: '项目资料归档',
    component: Home,
    iconCls: 'el-icon-menu',
    children: [
      {
        path: '/groundingList',
        name: '项目资料查询',
        meta: '',
        component: () => import('@/views/member/groundingList')
      },
      {
        path: '/groundingDetail',
        name: '项目资料复核',
        meta: '',
        component: () => import('@/views/member/groundingDetail')
      }
    ]
  }
]
