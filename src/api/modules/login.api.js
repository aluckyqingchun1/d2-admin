export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
       * @description 请求项目中的文件
       * @param {String} url 文件地址
       */
  getCaptcha () {
    return request({
      baseURL: process.env.BASE_URL,
      url: '/login/captcha',
      method: 'get'
    })
  },
  login (data) {
    return request({
      baseURL: process.env.BASE_URL,
      url: '/login/index',
      method: 'post',
      data
    })
  },
  register (data) {
    return request({
      baseURL: process.env.BASE_URL,
      url: '/login/register',
      method: 'post',
      data
    })
  }
})
