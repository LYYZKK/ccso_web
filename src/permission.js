import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { generateIndexRouter } from "@/utils/util"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 免登陆白名单路由.
const whiteList = [
  '/',
  '/website',
  '/website/home',
  '/website/news',
  '/website/guide',
  '/website/train',
  '/website/expertDirectories',
  '/website/enterpriseDirectory',
  '/user/login',
  '/user/register',
  '/user/register-result',
  '/user/forgot-password'
] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: '/dashboard/analysis' })
      NProgress.done()
    } else {
      if (whiteList.includes(to.path)) { // 有 token 时跳转到白名单直接进入.
        if (to.path === '/') next({ path: '/website'}) // 解决 windows chrome 中进到根目录时无法自动跳转到首页.
        next()
        NProgress.done()
      } else if (store.getters.permissionList.length === 0) { // 如果是跳到非白名单路由, 才请求菜单.
        store.dispatch('GetPermissionList').then(res => {
          const menuData = res.result
          if (menuData === null || menuData === "" || menuData === undefined) {
            return
          }
          let constRoutes = generateIndexRouter(menuData)
          // 添加主界面路由
          store.dispatch('UpdateAppRouter',  { constRoutes }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
              NProgress.done()
            }
          })
        })
        .catch(() => {
          notification.error({
            message: '系统提示',
            description: '请求用户信息失败，请重试！'
          })
          store.dispatch('Logout').then(() => {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
            NProgress.done()
          })
        })
      } else {
        next()
        NProgress.done()
      }
    }
  } else { // no token.
    if (!whiteList.includes(from.path)) { // 从非白名单跳转而来又没有 token, 原因是 token 失败, 直接进入登录页.
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    } else { // 从白名单菜单跳转而来.
      if (to.path === '/') { // 从白名单跳转到首页.
        next({ path: '/website'})
        NProgress.done()
      } else if (whiteList.indexOf(to.path) !== -1) { // 从白名单跳转到白名单, 直接进入.
        next()
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
