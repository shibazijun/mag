import Home from '@/views/Home'
export default [
  {
    path: '/',
    name: '项目管理',
    component: Home,
    iconCls: 'el-icon-menu',
    children: [
      {
        path: '/finpageList',
        name: '融资管理',
        meta: '',
        component: () => import('@/views/member/groundingList')
      },
      {
        path: '/finpageDetail',
        name: '新增融资申请',
        meta: '',
        component: () => import('@/views/member/groundingDetail')
      },
      {
        path: '/finpageCheckList',
        name: '复核',
        meta: '',
        component: () => import('@/views/d3/Scatterplot')
      }
    ]
  },
  {
    path: '/',
    name: '区公司融资申请',
    component: Home,
    iconCls: 'el-icon-edit',
    children: [
      {
        path: '/branchDetail',
        name: '新增区公司融资申请',
        meta: '',
        component: () => import('@/views/demo/index')
      },
      {
        path: '/branchList',
        name: '区公司项目信息',
        meta: '',
        component: () => import('@/views/demo/index')
      },
      {
        path: '/branchCheckList',
        name: '复核',
        meta: '',
        component: () => import('@/views/demo/index')
      }
    ]
  }
]
