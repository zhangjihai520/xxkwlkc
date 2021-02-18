import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import student from './modules/student'
import school from './modules/school'
import recruit from './modules/recruit'
import manage from './modules/manage'
import common from './modules/common'
import settings from './modules/settings'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    student, school, recruit, manage, common,
    tagsView,
    permission,
    settings
  },
  getters
})

export default store
