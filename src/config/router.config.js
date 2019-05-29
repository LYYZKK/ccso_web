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
        meta: {title: '个人页', icon: 'user', keepAlive: true, permission: ['user']},
        children: [
          {
            path: 'settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: {title: '个人设置', hideHeader: true, keepAlive: true, permission: ['user']},
            redirect: '/account/settings/base',
            alwaysShow: true,
            children: [
              {
                path: 'base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: {title: '基本设置', hidden: true, keepAlive: true, permission: ['user']}
              },
              {
                path: 'security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {title: '安全设置', hidden: true, keepAlive: true, permission: ['user']}
              },
              {
                path: 'custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: {title: '个性化设置', hidden: true, keepAlive: true, permission: ['user']}
              },
              {
                path: 'binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: {title: '账户绑定', hidden: true, keepAlive: true, permission: ['user']}
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {title: '新消息通知', hidden: true, keepAlive: true, permission: ['user']}
              },
            ]
          },
        ]
      },
    ]
  },
  // {
  //   path: '/website',
  //   name: 'website',
  //   component: () => import('@/views/website/index'),
  //   meta: { title: '官网',keepAlive: true, permission: [ 'dashboard' ] }
  // },
  {
    path: '*', redirect: '/404', hidden: true
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
import home from '@/views/website/pages/home'
import news from '@/views/website/pages/news'
import guide from '@/views/website/pages/guide'
import train from '@/views/website/pages/train'
import expertDirectories from '@/views/website/pages/expertDirectories'
import enterpriseDirectory from '@/views/website/pages/enterpriseDirectory'

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
        component: home
      },
      {
        path: 'news',
        name: 'news',
        component: news
      },
      {
        path: 'guide',
        name: 'guide',
        component: guide
      },
      {
        path: 'train',
        name: 'train',
        component: train
      },
      {
        path: 'expertDirectories',
        name: 'expertDirectories',
        component: expertDirectories
      },
      {
        path: 'enterpriseDirectory',
        name: 'enterpriseDirectory',
        component: enterpriseDirectory
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
    ],
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
]
