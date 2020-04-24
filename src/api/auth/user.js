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
 * 验证并解析token
 * @param username
 */
export function checkToken(token) {
    return request({
        url: '/authorization-server/oauth/check_token',
        method: 'get',
        params: {
            token: token
        }
    })
}

/**
 * 登出
 */
export function logout(token) {
    return request({
        url: '/authorization-server/oauth/token',
        method: 'delete',
        params: { token: token }
    })
}
