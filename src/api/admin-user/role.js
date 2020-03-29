import request from '@/utils/request'

export function getRoleList(data) {
    return request({
        url: '/admin-user/role/list',
        method: 'post',
        data
    })
}

export function getRole(id) {
    return request({
        url: '/admin-user/role/' + id,
        method: 'get'
    })
}

export function createRole(data) {
    return request({
        url: '/admin-user/role',
        method: 'post',
        data
    })
}

export function updateRole(data) {
    return request({
        url: '/admin-user/role/' + data.id,
        method: 'put',
        data
    })
}

export function deleteRole(id) {
    return request({
        url: '/admin-user/role/' + id,
        method: 'delete'
    })
}
