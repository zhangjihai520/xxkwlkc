import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import StudentLayout from '@/layout/studentLayout'
/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 管理员路由
export const adminRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        //meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  },
  {
    path: '/login',
    redirect: '/admin/login',
    hidden: true
  },
  {
    path: '/admin/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/showData',
    component: (resolve) => require(['@/views/showData'], resolve),
    hidden: true
  },
]

// 学生路由
export const studentRoutes = [
  {
    path: '/login',
    redirect: '/student/login',
    hidden: true
  },
  {
    path: '/student/login',
    component: (resolve) => require(['@/views/student/login'], resolve),
    hidden: true
  },
  // {
  //   path: '/student/register',
  //   component: (resolve) => require(['@/views/student/register'], resolve),
  //   hidden: true
  // },
  {
    path: '/student/registerSuccess',
    component: (resolve) => require(['@/views/student/registerSuccess'], resolve),
    hidden: true
  },
  {
    path: '/student',
    component: StudentLayout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/student/index'], resolve),
        name: 'StudentIndex',
        meta: { title: '首页' }
      }, {
        path: 'applyInfo',
        component: (resolve) => require(['@/views/student/applyInfo'], resolve),
        name: 'StudentApplyInfo',
        meta: { title: '基本信息' }
      }, {
        path: 'preview',
        component: (resolve) => require(['@/views/student/preview'], resolve),
        name: 'StudentPreview',
        meta: { title: '信息预览' }
      }, {
        path: 'selectSchool',
        component: (resolve) => require(['@/views/student/selectSchool'], resolve),
        name: 'StudentSelectSchool',
        meta: { title: '选择学校' }
      }, {
        path: 'matriculateResult',
        component: (resolve) => require(['@/views/student/matriculateResult'], resolve),
        name: 'StudentMatriculateResult',
        meta: { title: '录取结果' }
      }, {
        path: 'editPwd',
        component: (resolve) => require(['@/views/student/editPwd'], resolve),
        name: 'StudentEditPwd',
        meta: { title: '修改密码' }
      }, {
        path: 'editPhone',
        component: (resolve) => require(['@/views/student/editPhone'], resolve),
        name: 'StudentEditPhone',
        meta: { title: '修改手机号' }
      }
    ]
  }
]

let routes = [];
if (process && process.env && process.env.VUE_APP_ROLE) {
  //不同环境对应不同路由配置
  switch (process.env.VUE_APP_ROLE) {
    case "admin": {
      routes = adminRoutes;
      break;
    }
    case "student": {
      routes = [{
        path: '',
        redirect: '/student/index',
        hidden: true
      }, ...studentRoutes];
      break;
    }
    default: {
      routes = [...studentRoutes, ...adminRoutes]
    }
  }
} else {
  routes = [...studentRoutes, ...adminRoutes]
}

export const constantRoutes = routes;

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
