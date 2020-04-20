import request from '@/utils/request'

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

export function getUserInfo(username) {
    return request({
        url: '/admin-user/user',
        method: 'get',
        params: { username: username }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
