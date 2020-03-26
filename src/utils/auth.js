import {setStore, getStore, removeStore} from './storage'

const TokenKey = 'Admin-Token'

/**
 * 存储token
 * @returns {*}
 */
export const getToken = () => {
    return getStore(TokenKey)
}

export const setToken = token => {
    return setStore(TokenKey, token)
}

export const removeToken = () => {
    return removeStore(TokenKey)
}

// 生成随机数
export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

// 转成 yyyy-MM-dd HH:mm:ss格式
export const convertDate = (date) => {
    let result = date
    if (date) {
        let dateTime = new Date(date).toJSON()
        result = new Date(+new Date(dateTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
    return result
}

// post请求转成文件并下载
export const exportFile = (data, fileName) => {
    const blob = new Blob([data])
    const elink = document.createElement('a')

    if ('download' in document.createElement('a')) {
        elink.download = fileName
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
    } else {
        navigator.msSaveBlob(blob, fileName)
    }
}
