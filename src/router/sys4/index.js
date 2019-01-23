import Home from '@/views/Home'
export default [
  {
    path: '/',
    name: '报表统计',
    component: Home,
    iconCls: 'el-icon-menu',
    children: [
      {
        path: '/orgDimensionList',
        name: '机构维度统计',
        meta: '',
        component: () => import('@/views/member/groundingList')
      },
      {
        path: '/proDimensionList',
        name: '项目维度统计',
        meta: '',
        component: () => import('@/views/member/groundingDetail')
      },
      {
        path: '/finDimensionList',
        name: '区公司融资数据分析',
        meta: '',
        component: () => import('@/views/d3/Scatterplot')
      }
    ]
  }
]
