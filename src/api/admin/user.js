import request from '@/utils/request'

export function queryUserList(data) {
    return request({
        url: '/admin-user/user/list',
        method: 'post',
        data
    })
}

export function getUser(id) {
    return request({
        url: '/admin-user/user/' + id,
        method: 'get'
    })
}

export function createUser(data) {
    return request({
        url: '/admin-user/user',
        method: 'post',
        data
    })
}

export function updateUser(data) {
    return request({
        url: '/admin-user/user/' + data.id,
        method: 'put',
        data
    })
}

export function deleteUser(id) {
    return request({
        url: '/admin-user/user/' + id,
        method: 'delete'
    })
}
