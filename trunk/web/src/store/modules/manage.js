import * as manageService from '@/api/manage/index'


const manage = {
    state: {
    },

    mutations: {
    },

    actions: {
        /**
         * 查找资格审核失败的学生
         * 使用页面：管理员-修改核验结果
         */
        GetVerifyFailStudentList({ commit }, params) {
            return new Promise((resolve, reject) => {
                manageService.getVerifyFailStudentList(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 修改学生审核资格
         * 使用页面：管理员-修改核验结果
         */
        EditStudentVerifyResults({ commit }, params) {
            return new Promise((resolve, reject) => {
                manageService.editStudentVerifyResults(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取访问入口配置（采集、填报、查看结果三个模块的开放配置）
         * 使用页面：管理员-学生功能开关
         */
        GtAccessConfig({ commit }) {
            return new Promise((resolve, reject) => {
                manageService.getAccessConfig().then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 保存访问入口配置（采集、填报、查看结果三个模块的开放配置）
         * 使用页面：管理员-学生功能开关
         */
        SaveAccessConfig({ commit }, params) {
            return new Promise((resolve, reject) => {
                manageService.saveAccessConfig(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 生成待摇号数据
         * 使用页面：管理员-摇号处理
         */
        GenToBeAllocateData({ commit }) {
            return new Promise((resolve, reject) => {
                manageService.genToBeAllocateData().then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取学校列表，计划、报名数（摇号）
         * 使用页面：管理员-摇号处理
         */
        GetSchoolFillSummaryList({ commit }) {
            return new Promise((resolve, reject) => {
                manageService.getSchoolFillSummaryList().then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 重置密码
         * 使用页面：管理员-查看核验结果
         */
        RestPassword({ commit }, params) {
            return new Promise((resolve, reject) => {
                manageService.restPassword(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 领导级学校列表
         */
        GetShowDataSchoolList({ commit }) {
            return new Promise((resolve, reject) => {
                manageService.getShowDataSchoolList().then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 领导级数据汇总
         */
        GetSummaryData({ commit }) {
            return new Promise((resolve, reject) => {
                manageService.getSummaryData().then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default manage
