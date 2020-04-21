import request from '@/utils/request'

/**
 * 根据条件获取资源信息列表
 * @param data
 * @returns {*}
 */
export function getResourceList(data) {
    return request({
        url: '/admin-user/resource/list',
        method: 'post',
        data
    })
}

/**
 * 根据用户名获取相应的资源集合
 * @param username
 * @returns {*}
 */
export function getResourceByUsername(username) {
    return request({
        url: '/admin-user/resource/user/' + username,
        method: 'get'
    })
}

/**
 * 根据用户id获取相应的资源集合
 * @param userId
 * @returns {*}
 */
export function getResourceByUserId(userId) {
    return request({
        url: '/admin-user/resource',
        method: 'get',
        params: {
            userId: userId
        }
    })
}

/**
 * 根据资源id获取指定资源信息
 * @param id
 */
export function getResource(id) {
    return request({
        url: '/admin-user/resource/' + id,
        method: 'get'
    })
}

/**
 * 新增资源
 * @param data
 */
export function createResource(data) {
    return request({
        url: '/admin-user/resource',
        method: 'post',
        data
    })
}

/**
 * 更新资源信息
 * @param data
 */
export function updateResource(data) {
    return request({
        url: '/admin-user/resource/' + data.id,
        method: 'put',
        data
    })
}

/**
 * 根据id删除资源
 * @param id
 */
export function deleteResource(id) {
    return request({
        url: '/admin-user/resource/' + id,
        method: 'delete'
    })
}
