import request from '@/utils/request'

const mockUrl = process.env.VUE_APP_MOCK_API;

/**
 * 获取字典表数据
 {
    dictionaryTypes: []
  }
 */
export function getDictionaryData(dictionaryTypes) {
    return request({
        url: mockUrl + '/student/getDictionaryData',
        method: 'post',
        data: dictionaryTypes
    })
}

/**
 * 获取派出所列表
 */
export function getPoliceList() {
    return request({
        url: mockUrl + '/student/getPoliceList',
        method: 'post'
    })
}


/**
 * 获取区县列表
 */
export function getDepartmentList() {
    return request({
        url: mockUrl + '/student/getDepartmentList',
        method: 'post'
    })
}

// 获取小学学校列表
export function getPrimarySchoolList() {
    return request({
        url: mockUrl + '/student/getPrimarySchoolList',
        method: 'post'
    })
}

// 获取民办学校列表
export function getSchoolList() {
    return request({
        url: mockUrl + '/student/getSchoolList',
        method: 'post'
    })
}

// 发送短信
export function sendMessage(params) {
    return request({
        url: mockUrl + '/student/sendMessage',
        method: 'post',
        data: params
    })
}

/**
 * 查看学生采集信息详情
 * 使用页面：招生计划;修改审核结果（中招科、教体局、管理员）
 */
export function getStudentDetail(params) {
    return request({
        url: mockUrl + '/recruit/getStudentDetail',
        method: 'post',
        data: params
    })
}