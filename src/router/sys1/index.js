import Home from '@/views/Home'

{
  path: '/login',
    name: 'Login',
  hidden: true, // 左侧导航栏中隐藏
  component: () => import('@/views/Login'),
  iconCls: 'el-icon-message',//图标样式class
},


export default [
  {
    path: '/',
    name: '授信信息管理',
    component: Home,
    iconCls: 'el-icon-menu',
    children: [
      {
        path: '/creditList',
        name: '授信信息表',
        meta: '',
        component: () => import('@/views/member/groundingList')
      },
      {
        path: '/creditDetail',
        name: '新增授信',
        meta: '',
        component: () => import('@/views/member/groundingDetail')
      },
      {
        path: '/creditCheckList',
        name: '复核',
        meta: '',
        component: () => import('@/views/d3/Scatterplot')
      }
    ]
  },
  {
    path: '/',
    name: '增信信息管理',
    component: Home,
    iconCls: 'el-icon-edit',
    children: [
      {
        path: '/groundingList',
        name: '担保信息表',
        meta: '',
        component: () => import('@/views/demo/index')
      },
      {
        path: '/groundingDetail',
        name: '担保物增信表',
        meta: '',
        component: () => import('@/views/demo/index')
      }
    ]
  },
  {
    path: '/',
    name: '汇率管理',
    component: Home,
    iconCls: 'el-icon-edit',
    children: [
      {
        path: '/exchangeList',
        name: '汇率维护',
        meta: '',
        component: () => import('@/views/demo/index')
      },
      {
        path: '/exchangeCheckList',
        name: '汇率复核',
        meta: '',
        component: () => import('@/views/demo/index')
      }
    ]
  }
  // {
  //   path: '/',
  //   name: '',
  //   component: Home,
  //   iconCls: 'el-icon-time',
  //   leaf: true, // 已经是叶子结点（只有一个节点）
  //   children: [
  //     {
  //       path: '/timeline', //  活动时间图
  //       name: '汇率管理',
  //       component: () => import('@/views/timeline/index')
  //     }
  //   ]
  // }
]
