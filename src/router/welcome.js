import Home from '@/views/Home'
export default [
  {
    path: '/',
    name: '',
    component: Home,
    hidden: true, // nav中隐藏，不希望被看到
    children: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true, // 左侧导航栏中隐藏
    component: () => import('@/views/Login'),
    iconCls: 'el-icon-message',//图标样式class
  },
  { // 个人主页
    path: '/',
    name: '',
    component: Home,
    hidden: true,
    children: [
      {
        path: '/profile',
        name: '个人主页',
        component: () => import('@/views/Profile')
      }
    ]
  }
]
