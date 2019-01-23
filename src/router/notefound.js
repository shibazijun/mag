export default [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { // 路由不在范围内跳转到404
    path: '*',
    hidden: true,
    redirect: {path: '/404'}
  }
]
