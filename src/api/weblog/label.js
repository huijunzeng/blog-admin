import request from '@/utils/request'

/**
 * 获取所有标签信息列表
 */
export function getAllLabels() {
    return request({
        url: '/article-admin/label/all',
        method: 'get'
    })
}

/**
 * 根据条件获取标签列表
 * @param data
 */
export function queryLabelList(data) {
    return request({
        url: '/article-admin/label/list',
        method: 'post',
        data
    })
}

/**
 * 根据标签id获取指定标签信息
 * @param id
 */
export function getLabel(id) {
    return request({
        url: '/article-admin/label/' + id,
        method: 'get'
    })
}

/**
 * 根据文章id获取相应的标签集合
 * @param id
 */
export function getLabelByArticleId(articleId) {
    return request({
        url: '/article-admin/label/article/' + articleId,
        method: 'get'
    })
}

/**
 * 新增标签
 * @param data
 */
export function createLabel(data) {
    return request({
        url: '/article-admin/label',
        method: 'post',
        data
    })
}

/**
 * 修改标签
 * @param data
 */
export function updateLabel(data) {
    return request({
        url: '/article-admin/label/' + data.id,
        method: 'put',
        data
    })
}

/**
 * 根据id删除标签
 * @param id
 */
export function deleteLabel(id) {
    return request({
        url: '/article-admin/label/' + id,
        method: 'delete'
    })
}
