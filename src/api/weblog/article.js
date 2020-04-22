import request from '@/utils/request'

/**
 * 根据条件获取文章信息列表
 * @param data
 */
export function queryArticleList(data) {
    return request({
        url: '/article-admin/article/list',
        method: 'post',
        data
    })
}

/**
 * 根据文章id获取指定文章信息
 * @param id
 */
export function getArticle(id) {
    return request({
        url: '/article-admin/article/' + id,
        method: 'get'
    })
}

/**
 * 新增文章
 * @param data
 */
export function createArticle(data) {
    return request({
        url: '/article-admin/article',
        method: 'post',
        data
    })
}

/**
 * 修改文章
 * @param data
 */
export function updateArticle(data) {
    return request({
        url: '/article-admin/article/' + data.id,
        method: 'put',
        data
    })
}

/**
 * 根据id删除文章
 * @param id
 */
export function deleteArticle(id) {
    return request({
        url: '/article-admin/article/' + id,
        method: 'delete'
    })
}
