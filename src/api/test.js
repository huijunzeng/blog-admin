import request from '@/utils/request'
export function testClick() {
    return request({
        url: 'http://localhost:8066/',
        method: 'get'
    })
}

export function getUser() {
    return request({
        url: 'http://localhost:8066/UserMock',
        method: 'get'
    })
}

