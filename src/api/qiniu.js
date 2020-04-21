import request from '@/utils/request'

/**
 * 七牛云图片上传
 */
export function uploadImage(data) {
  return request({
    url: '/file-server/upload/img', // 假地址 自行替换
    method: 'post',
    headers: { "Content-Type": "multipart/form-data" },
    data
  })
}
