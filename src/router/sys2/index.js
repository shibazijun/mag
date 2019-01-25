const ls=[
  {
      path: '/',
      name: 'ba',
    component: () => import('@/views/layout'),
      meta:{title:"资产管理",iconCls: 'el-icon-message',role:['2000']},
      children:[
          {
            path: '/',
            name: 'baseInfo',
            component: () => import('@/views/Layempty'),
            meta:{title:"资产信息管理",iconCls: 'el-icon-message',role:['2100']},
            children: [
                {
                  path: '/baseInfoList',
                  name: 'baseInfoList',
                  meta:{title:"资产列表信息",iconCls: 'el-icon-message',role:['2101']},
                  component: () => import('@/views/member/groundingList')
                },
                {
                  path: '/invesInfoList',
                  name: 'invesInfoList',
                  meta:{title:"复核",iconCls: 'el-icon-message',role:['2102']},
                  component: () => import('@/views/member/groundingDetail')
                },
                {
                  path: '/salesInfoList',
                  name: 'salesInfoList',
                  meta:{title:"项目工程销售表",iconCls: 'el-icon-message',role:['2103']},
                  component: () => import('@/views/d3/Scatterplot')
                },
                {
                  path: '/finList',
                  name: 'finList',
                  meta:{title:"总部融资信息表",iconCls: 'el-icon-message',role:['2104']},
                  component: () => import('@/views/d3/Scatterplot')
                }
            ]
          },
          {
            path: '/',
            name: 'col',
            component: () => import('@/views/Layempty'),
            meta:{title:"项目筛选",iconCls: 'el-icon-message',role:['2200']},
            children: [
              {
                path: '/collectInfo',
                name: 'collectInfo',
                meta:{title:"担保信息表",iconCls: 'el-icon-message',role:['2201']},
                component: () => import('@/views/demo/index')
              }
            ]
          }
      ]
  }
]

export default ls
