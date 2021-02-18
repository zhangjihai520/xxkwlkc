import * as studentService from '@/api/student/index'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'


const student = {
    state: {
        studentInfo: {
            name: "",
            isFirstLogin: 1,
            isFromCity: 1 //0：城区，1：注册用户
        },
        studentAccess: {
            isEditInfo: 0,
            isApplySchool: 0,
            isSelectResult: 0,
            isShowValidationResult: 0
        }
    },

    mutations: {
        SET_STUDENTINFO: (state, studentInfo) => {
            state.studentInfo = studentInfo
        },
        SET_STUDENTACCESS: (state, studentAccess) => {
            state.studentAccess = studentAccess
        }
    },

    actions: {
        // 登录
        StudentLogin({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                studentService.login(userInfo).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 学生注册
         * @param {*} userInfo 
         */
        StudentRegister({ }, userInfo) {
            return new Promise((resolve, reject) => {
                studentService.register(userInfo).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetStudentInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                studentService.getStudentInfo().then(res => {
                    const user = res.user;
                    commit('SET_STUDENTINFO', user);
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取学生权限
        GetAccess({ commit, state }) {
            return new Promise((resolve, reject) => {
                studentService.getAccess().then(res => {
                    const studentAccess = {
                        ...res
                    };
                    commit('SET_STUDENTACCESS', studentAccess);
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 保存学生信息-基本信息
        SaveStudentApplyInfo({ commit, state }, applyInfo) {
            return new Promise((resolve, reject) => {
                studentService.saveStudentApplyInfo(applyInfo).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取学生申报信息
        GetStudentApplyInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                studentService.getStudentApplyInfo().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 提交学生信息审核
        SubmitInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                studentService.submitInfo().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取学生志愿列表
        GetApplySchoolList({ commit, state }) {
            return new Promise((resolve, reject) => {
                studentService.getApplySchoolList().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 提交学生志愿
        SubmitApplySchool({ commit, state }, param) {
            return new Promise((resolve, reject) => {
                studentService.submitApplySchool(param).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取学生录取结果
        GetApplyResult({ commit, state }) {
            return new Promise((resolve, reject) => {
                studentService.getApplyResult().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 确认缴费
        ConfirmPay({ commit, state }) {
            return new Promise((resolve, reject) => {
                studentService.confirmPay().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出系统
        StudentLogOut({ }) {
            return new Promise(resolve => {
                removeToken()
                Cookies.remove("isFirstLogin");
                resolve()
            })
        },
        // 退出系统
        confirmTreaty({ }) {
            return new Promise((resolve, reject) => {
                studentService.confirmTreaty().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default student
