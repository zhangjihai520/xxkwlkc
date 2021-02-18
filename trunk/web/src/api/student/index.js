import request from '@/utils/request'
const mockUrl = process.env.VUE_APP_MOCK_API;

/**
 * 登录方法
 {
    userName,
    pwd,
    code
  }
 */
export function login(params) {
    return request({
        url: mockUrl + '/student/login',
        method: 'post',
        data: params
    })
}

// 获取学生详细信息
export function getStudentInfo() {
    return request({
        url: mockUrl + '/student/getUserInfo',
        method: 'post'
    })
}

// 获取学生操作权限
export function getAccess() {
    return request({
        url: mockUrl + '/student/getAccess',
        method: 'post'
    })
}

/**
 * 注册
 {
    "name": "",
    "identify": "",
    "sex": 0,
    "policeId": 198,
    "houseId": 13,
    "phone": "",
    "code": "",
    "uuid": ""
  }
 */
export function register(params) {
    return request({
        url: mockUrl + '/student/register',
        method: 'post',
        data: params
    })
}

/**
 * 保存学生申报信息
 */
export function saveStudentApplyInfo(params) {
    return request({
        url: mockUrl + '/student/saveStudentApplyInfo',
        method: 'post',
        data: params
    })
}

// 获取学生申报信息
export function getStudentApplyInfo() {
    return request({
        url: mockUrl + '/student/getStudentApplyInfo',
        method: 'post'
    })
}
// 提交学生信息审核
export function submitInfo() {
    return request({
        url: mockUrl + '/student/submitInfo',
        method: 'post'
    })
}
// 获取学生志愿列表
export function getApplySchoolList() {
    return request({
        url: mockUrl + '/student/getApplySchoolList',
        method: 'post'
    })
}

// 提交学生志愿
export function submitApplySchool(params) {
    return request({
        url: mockUrl + '/student/submitApplySchool',
        method: 'post',
        data: params
    })
}

// 获取学生录取结果
export function getApplyResult(params) {
    return request({
        url: mockUrl + '/student/getApplyResult',
        method: 'post',
        data: params
    })
}
// 确认缴费
export function confirmPay(params) {
    return request({
        url: mockUrl + '/student/confirmPay',
        method: 'post',
        data: params
    })
}
// 首次登录，确认
export function confirmTreaty() {
    return request({
        url: mockUrl + '/student/confirmTreaty',
        method: 'post'
    })
}
