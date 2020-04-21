import request from '@/utils/request'

/**
 * 获取所有角色信息列表
 */
export function getAllRoles() {
    return request({
        url: '/admin-user/role/all',
        method: 'get'
    })
}

/**
 * 根据条件获取角色信息列表
 * @param data
 */
export function queryRoleList(data) {
    return request({
        url: '/admin-user/role/list',
        method: 'post',
        data
    })
}

/**
 * 根据角色id获取指定角色信息
 * @param id
 */
export function getRole(id) {
    return request({
        url: '/admin-user/role/' + id,
        method: 'get'
    })
}

/**
 * 新增角色
 * @param data
 */
export function createRole(data) {
    return request({
        url: '/admin-user/role',
        method: 'post',
        data
    })
}

/**
 * 更新指定角色信息
 * @param data
 */
export function updateRole(data) {
    return request({
        url: '/admin-user/role/' + data.id,
        method: 'put',
        data
    })
}

/**
 * 根据id删除角色
 * @param id
 */
export function deleteRole(id) {
    return request({
        url: '/admin-user/role/' + id,
        method: 'delete'
    })
}
