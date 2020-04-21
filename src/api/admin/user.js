import request from '@/utils/request'

/**
 * 根据条件获取用户信息列表
 * @param data
 */
export function queryUserList(data) {
    return request({
        url: '/admin-user/user/list',
        method: 'post',
        data
    })
}

/**
 * 根据用户id获取指定用户信息
 * @param id
 */
export function getUser(id) {
    return request({
        url: '/admin-user/user/' + id,
        method: 'get'
    })
}

/**
 * 新增用户
 * @param data
 */
export function createUser(data) {
    return request({
        url: '/admin-user/user',
        method: 'post',
        data
    })
}

/**
 * 更新指定用户信息
 * @param data
 */
export function updateUser(data) {
    return request({
        url: '/admin-user/user/' + data.id,
        method: 'put',
        data
    })
}

/**
 * 根据用户id删除用户
 * @param id
 */
export function deleteUser(id) {
    return request({
        url: '/admin-user/user/' + id,
        method: 'delete'
    })
}
