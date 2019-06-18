import {UserLayout, TabLayout, RouteView} from '@/components/layouts'

/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */
export const asyncRouterMap = [
  {
    path: '/',
    // name: 'dashboard',
    name: '_dashboard',
    // component: TabLayout,
    // component: () => import('@/views/website/index'),

    meta: {title: '首页'},
    // redirect: '/dashboard/workplace',
    redirect: '/website',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {title: '仪表盘', icon: 'dashboard', permission: ['dashboard']},
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/website/index'),
            // component: () => import('@/views/dashboard/Analysis'),
            meta: {title: '分析页', permission: ['dashboard']}
          },
          // {
          //   path: '/dashboard/abc',
          //   name: 'abc',
          //   component: () => import('@/views/website/index'),
          //   meta: { title: '官网', permission: [ 'dashboard' ] }
          // },
          {
            path: '/dashboard/monitor',
            name: 'Monitor',
            hidden: true,
            component: () => import('@/views/dashboard/Monitor'),
            meta: {title: '监控页', permission: ['dashboard']}
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {title: '工作台', permission: ['dashboard']}
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: {title: '异常页', icon: 'warning', permission: ['exception']},
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: {title: '403', permission: ['exception']}
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: {title: '404', permission: ['exception']}
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: {title: '500', permission: ['exception']}
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        name: 'account',
        meta: {title: '我的帐号', icon: 'user', keepAlive: true, permission: ['user']},
        children: [
          {
            path: 'settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: {title: '修改信息', hideHeader: true, keepAlive: true, permission: ['user']},
            redirect: '/account/settings/enterprise',
            alwaysShow: true,
            children: [
              {
                path: 'enterprise',
                name: 'EnterpriseSettings',
                component: () => import('@/views/account/settings/Enterprise'),
                meta: {title: '企业信息', hidden: true, keepAlive: true, permission: ['user']}
              },
              {
                path: 'user',
                name: 'UserSettings',
                component: () => import('@/views/account/settings/User'),
                meta: {title: '用户信息', hidden: true, keepAlive: true, permission: ['user']}
              }
            ]
          },
        ]
      },
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  },
]

export const constantRouterMap = [
  {
    path: '/website',
    component: () => import('@/views/website/index'),
    redirect: '/website/home',
    hidden: false,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "website" */ '@/views/website/pages/home')
      },
      {
        path: 'news',
        name: 'news',
        component: () => import(/* webpackChunkName: "website" */ '@/views/website/pages/news')
      },
      {
        path: 'guide',
        name: 'guide',
        component: () => import(/* webpackChunkName: "website" */ '@/views/website/pages/guide')
      },
      {
        path: 'train',
        name: 'train',
        component: () => import(/* webpackChunkName: "website" */ '@/views/website/pages/train')
      },
      {
        path: 'expert-directory',
        name: 'expertDirectory',
        component: () => import(/* webpackChunkName: "website" */ '@/views/website/pages/expertDirectory')
      },
      {
        path: 'enterprise-directory',
        name: 'enterpriseDirectory',
        component: () => import(/* webpackChunkName: "website" */ '@/views/website/pages/enterpriseDirectory')
      },
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'forgot-password',
        name: 'forgotPassword',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/ForgotPassword')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'active-result',
        name: 'activeResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/ActiveResult')
      },
    ],
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
]
