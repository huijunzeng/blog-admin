import request from '@/utils/request'

/**
 * 获取所有分类信息列表
 */
export function getAllClassifications() {
    return request({
        url: '/article-admin/classification/all',
        method: 'get'
    })
}

/**
 * 根据条件获取分类列表
 * @param data
 */
export function queryClassificationList(data) {
    return request({
        url: '/article-admin/classification/list',
        method: 'post',
        data
    })
}

/**
 * 根据分类id获取指定分类信息
 * @param id
 */
export function getClassification(id) {
    return request({
        url: '/article-admin/classification/' + id,
        method: 'get'
    })
}

/**
 * 根据文章id获取相应的分类集合
 * @param id
 */
export function getClassificationByArticleId(articleId) {
    return request({
        url: '/article-admin/classification/article/' + articleId,
        method: 'get'
    })
}

/**
 * 新增分类
 * @param data
 */
export function createClassification(data) {
    return request({
        url: '/article-admin/classification',
        method: 'post',
        data
    })
}

/**
 * 修改分类
 * @param data
 */
export function updateClassification(data) {
    return request({
        url: '/article-admin/classification/' + data.id,
        method: 'put',
        data
    })
}

/**
 * 根据id删除分类
 * @param id
 */
export function deleteClassification(id) {
    return request({
        url: '/article-admin/classification/' + id,
        method: 'delete'
    })
}
