import Home from '@/views/Home'
export default [
  {
    path: '/',
    name: '增信管理',
    component: Home,
    iconCls: 'el-icon-menu',//图标样式class  // element-ui 自带图标查看 http://element.eleme.io/#/zh-CN/component/icon#tu-biao-ji-he
    children: [
      {
        path: '/groundingList',
        name: '授信信息表',
        meta: '',
        component: () => import('@/views/member/groundingList')
      },
      {
        path: '/groundingDetail',
        name: '新增授信',
        meta: '',
        component: () => import('@/views/member/groundingDetail')
      },
      {
        path: '/scatterplot',
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
        path: '/demo',
        name: '担保信息表',
        meta: '',
        component: () => import('@/views/demo/index')
      }
    ]
  },
  {
    path: '/',
    name: '',
    component: Home,
    iconCls: 'el-icon-time',
    leaf: true, // 已经是叶子结点（只有一个节点）
    children: [
      {
        path: '/timeline', //  活动时间图
        name: '汇率管理',
        component: () => import('@/views/timeline/index')
      }
    ]
  }
]