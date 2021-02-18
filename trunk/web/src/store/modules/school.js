import * as schoolService from '@/api/school/index'


const school = {
    state: {
    },

    mutations: {
    },

    actions: {
        /**
         * 获取当前学校招生计划
         * 使用页面：民办学校-招生计划
         */
        GetSchoolPlan({ commit }) {
            return new Promise((resolve, reject) => {
                schoolService.getSchoolPlan().then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取当前学校报名统计数据
         * 使用页面：民办学校-报名情况-报名数据统计
         */
        GetFillSummaryInfo({ commit }) {
            return new Promise((resolve, reject) => {
                schoolService.getFillSummaryInfo().then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取当前学校报名情况
         * 使用页面：民办学校-报名情况-报名学生列表
         */
        GetFillStudentList({ commit }, params) {
            return new Promise((resolve, reject) => {
                schoolService.getFillStudentList(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取当前学校报名情况
         * 使用页面：民办学校-报名情况-报名学生列表
         */
        GetPaymentList({ commit }, params) {
            return new Promise((resolve, reject) => {
                schoolService.getPaymentList(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 将学生标记为已缴费
         * 使用页面：民办学校-待缴费列表-缴费
         */
        StudentPay({ commit }, params) {
            return new Promise((resolve, reject) => {
                schoolService.studentPay(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 将学生标记为放弃学位
         * 使用页面：民办学校-录取结果
         */
        GiveUp({ commit }, params) {
            return new Promise((resolve, reject) => {
                schoolService.giveUp(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取录取结果列表
         * 使用页面：民办学校-录取结果
         */
        GetAdmissionResultList({ commit }, params) {
            return new Promise((resolve, reject) => {
                schoolService.getAdmissionResultList(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 提交学籍网账号
         * 使用页面：小学
         */
        SubmitSchoolRollAccount({ commit }, params) {
            return new Promise((resolve, reject) => {
                schoolService.submitSchoolRollAccount(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default school
