
const ls = [
  {
    path: '/',
    name: 'credit',
    component: () => import('@/views/Layout'),
    meta:{title:"增信管理",iconCls: 'el-icon-message',role:['1000']},
    children:[
      {
        path: '/',
        name: 'creditsys',
        component: () => import('@/views/Layempty'),
        meta:{title:"授信信息管理",iconCls: 'el-icon-message',role:['1100']},
        children: [
            {
              path: '/creditList',
              name: 'creditList',
              meta:{title:"授信信息表",iconCls: 'el-icon-message',role:['1101']},
              component: () => import('@/views/member/groundingList')
            },
            {
              path: '/creditDetail',
              name: 'creditDetail',
              meta:{title:"新增授信",iconCls: 'el-icon-message',role:['1102']},
              component: () => import('@/views/member/groundingDetail')
            }
        ]
      },
      {
        path: 'grounding',
        redirect:'/credit/grounding/groundingList',
        name: 'grounding',
        component: () => import('@/views/Home'),
        meta:{title:"增信信息管理",iconCls: 'el-icon-message',role:['1200']},
        children: [
          {
            path: '/groundingList',
            name: 'groundingList',
            meta:{title:"担保信息表",iconCls: 'el-icon-message',role:['1201']},
            component: () => import('@/views/demo/index')
          },
          {
            path: '/groundingDetail',
            name: 'groundingDetail',
            meta:{title:"担保物增信表",iconCls: 'el-icon-message',role:['1202']},
            component: () => import('@/views/demo/index')
          }
        ]
      }
    ]
}]


export default ls
