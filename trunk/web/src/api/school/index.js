import request from '@/utils/request'
const mockUrl = process.env.VUE_APP_MOCK_API;

/**
 * 获取当前学校招生计划
 * 使用页面：民办学校-招生计划
 */
export function getSchoolPlan() {
    return request({
        url: mockUrl + '/school/getSchoolPlan',
        method: 'post'
    })
}

/**
 * 获取当前学校报名统计数据
 * 使用页面：民办学校-报名情况-报名数据统计
 */
export function getFillSummaryInfo() {
    return request({
        url: mockUrl + '/school/getFillSummaryInfo',
        method: 'post'
    })
}

/**
 * 获取当前学校报名情况
 * 使用页面：民办学校-报名情况-报名学生列表
 */
export function getFillStudentList(params) {
    return request({
        url: mockUrl + '/school/getFillStudentList',
        method: 'post',
        data: params
    })
}

/**
 * 获取当前学校待缴费列表
 * 使用页面：民办学校-待缴费列表
 */
export function getPaymentList(params) {
    return request({
        url: mockUrl + '/school/getPaymentList',
        method: 'post',
        data: params
    })
}

/**
 * 将学生标记为已缴费
 * 使用页面：民办学校-待缴费列表-缴费
 */
export function studentPay(params) {
    return request({
        url: mockUrl + '/school/studentPay',
        method: 'post',
        data: params
    })
}

/**
 * 将学生标记为放弃学位
 * 使用页面：民办学校-录取结果
 */
export function giveUp(params) {
    return request({
        url: mockUrl + '/school/giveUp',
        method: 'post',
        data: params
    })
}

/**
 * 获取录取结果列表
 * 使用页面：民办学校-录取结果
 */
export function getAdmissionResultList(params) {
    return request({
        url: mockUrl + '/school/getAdmissionResultList',
        method: 'post',
        data: params
    })
}
/**
 * 提交学籍网账号
 * 使用页面：小学
 */
export function submitSchoolRollAccount(params) {
    return request({
        url: mockUrl + '/primarySchool/submitSchoolRollAccount',
        method: 'post',
        data: params
    })
}