import * as commonService from '@/api/common'

const common = {
    state: {
    },

    mutations: {
    },

    actions: {
        // 获取字典表数据
        GetDictionaryData({ commit }, dictionaryTypes) {
            return new Promise((resolve, reject) => {
                commonService.getDictionaryData({ dictionaryTypeIds: dictionaryTypes.join(',') }).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取派出所列表
        GetPoliceList({ commit, state }) {
            return new Promise((resolve, reject) => {
                commonService.getPoliceList().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取区县列表
        GetDepartmentList({ commit, state }) {
            return new Promise((resolve, reject) => {
                commonService.getDepartmentList().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取小学学校列表
        GetPrimarySchoolList({ commit, state }) {
            return new Promise((resolve, reject) => {
                commonService.getPrimarySchoolList().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取民办学校列表
        GetSchoolList({ commit, state }) {
            return new Promise((resolve, reject) => {
                commonService.getSchoolList().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 发送短信
        SendMessage({ commit, state }, param) {
            return new Promise((resolve, reject) => {
                commonService.sendMessage(param).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 查看学生采集信息详情
         * 使用页面：招生计划;修改审核结果（中招科、教体局、管理员）
         */
        getStudentDetail({ commit, state }, param) {
            return new Promise((resolve, reject) => {
                commonService.getStudentDetail(param).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default common
