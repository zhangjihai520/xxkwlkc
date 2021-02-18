import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/admin/login', '/auth-redirect', '/bind', '/register', '/student/login', '/student/register', '/student/registersuccess']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const path = to.path.toLocaleLowerCase();
  const systemRole = process.env.VUE_APP_ROLE;
  if (getToken()) {
    //学生端页面权限
    if (systemRole == "student" || path.indexOf('/student') > -1) {
      if (whiteList.indexOf(path) !== -1) {
        next(); NProgress.done();
        return;
      }
      store.dispatch('GetStudentInfo').then((res) => {
        if (res && res.user) {
          store.dispatch('GetAccess').then((res) => {
            if (isStudentAccess(path, res)) {
              next();
            } else {
              next('/student/index');
              NProgress.done()
            }
          }).catch(() => { next(`/student/login`); });
        } else {
          next(`/student/login`) // 否则全部重定向到登录页
          NProgress.done()
        }
      }).catch(() => { next(`/student/login`); });
    } else {
      //管理端页面权限
      /* has token*/
      if (path === '/admin/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        if (store.getters.roles.length === 0) {
          // 判断当前用户是否已拉取完user_info信息
          store.dispatch('GetInfo').then(res => {
            // 拉取user_info
            const roles = res.roles
            store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
              // 测试 默认静态页面
              // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(accessRoutes) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
          })
            .catch(err => {
              store.dispatch('FedLogOut').then(() => {
                Message.error(err)
                next({ path: '/' })
              })
            })
        } else {
          next()
          // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
          // if (hasPermission(store.getters.roles, to.meta.roles)) {
          //   next()
          // } else {
          //   next({ path: '/401', replace: true, query: { noGoBack: true }})
          // }
          // 可删 ↑
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      if (systemRole == "student" || path.indexOf('/student/') > -1) {
        next(`/student/login`) // 否则全部重定向到登录页
      } else {
        next(`/admin/login?redirect=${to.path}`) // 否则全部重定向到登录页
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})


function isStudentAccess(path, { isEditInfo, isApplySchool, isSelectResult, isShowValidationResult }) {
  if (path == "/student/applyinfo" && !isEditInfo) {
    return false;
  } else if (path == "/student/selectschool" && (!isApplySchool && !isShowValidationResult)) {
    return false;
  } else if (path == "/student/matriculateresult" && !isSelectResult) {
    return false;
  }
  return true;
}