import request from '@/utils/request'
const mockUrl = process.env.VUE_APP_MOCK_API;

/**
 * 查找资格审核失败的学生
 * 使用页面：管理员-修改核验结果
 */
export function getVerifyFailStudentList(params) {
    return request({
        url: mockUrl + '/manage/getVerifyFailStudentList',
        method: 'post',
        data: params
    })
}

/**
 * 修改学生审核资格
 * 使用页面：管理员-修改核验结果
 */
export function editStudentVerifyResults(params) {
    return request({
        url: mockUrl + '/manage/editStudentVerifyResults',
        method: 'post',
        data: params
    })
}

/**
 * 获取访问入口配置（采集、填报、查看结果三个模块的开放配置）
 * 使用页面：管理员-学生功能开关
 */
export function getAccessConfig() {
    return request({
        url: mockUrl + '/manage/getAccessConfig',
        method: 'post'
    })
}

/**
 * 保存访问入口配置（采集、填报、查看结果三个模块的开放配置）
 * 使用页面：管理员-学生功能开关
 */
export function saveAccessConfig(params) {
    return request({
        url: mockUrl + '/manage/saveAccessConfig',
        method: 'post',
        data: params
    })
}

/**
 * 生成待摇号数据
 * 使用页面：管理员-摇号处理
 */
export function genToBeAllocateData() {
    return request({
        url: mockUrl + '/manage/genToBeAllocateData',
        method: 'post'
    })
}

/**
 * 获取学校列表，计划、报名数（摇号）
 * 使用页面：管理员-摇号处理
 */
export function getSchoolFillSummaryList() {
    return request({
        url: mockUrl + '/manage/getSchoolFillSummaryList',
        method: 'post'
    })
}

/**
 * 重置密码
 * 使用页面：管理员-查看核验结果
 */
export function restPassword(params) {
    return request({
        url: mockUrl + '/manage/restPassword',
        method: 'post',
        data: params
    })
}

/**
 * 领导级学校列表
 */
export function getShowDataSchoolList() {
    return request({
        url: mockUrl + '/manage/getShowDataSchoolList',
        method: 'post'
    })
}

/**
 * 领导级数据统计
 */
export function getSummaryData() {
    return request({
        url: mockUrl + '/manage/getSummaryData',
        method: 'post'
    })
}