import request from '@/utils/request'

/**
 * 用户登录
 * @param data
 */
export function login(data) {
    const form = {
        username: data.username,
        password: data.password,
        grant_type: 'password',
        scope: 'read'
    }
    return request({
        url: '/authorization-server/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='
        },
        method: 'post',
        params: form
    })
}

/**
 * 获取用户信息
 * @param username
 */
export function getUserInfo(username) {
    return request({
        url: '/admin-user/user',
        method: 'get',
        params: { username: username }
    })
}

/**
 * 登出
 */
export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
