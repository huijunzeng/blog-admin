import request from '@/utils/request'

export function getResourceList(data) {
    return request({
        url: '/admin-user/resource/list',
        method: 'post',
        data
    })
}

export function getResource(id) {
    return request({
        url: '/admin-user/resource/' + id,
        method: 'get'
    })
}

export function createResource(data) {
    return request({
        url: '/admin-user/resource',
        method: 'post',
        data
    })
}

export function updateResource(data) {
    return request({
        url: '/admin-user/resource/' + data.id,
        method: 'put',
        data
    })
}

export function deleteResource(id) {
    return request({
        url: '/admin-user/resource/' + id,
        method: 'delete'
    })
}
