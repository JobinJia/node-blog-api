module.exports = function () {
  return function (ctx, next) {
    return next().catch((err) => {
      switch (err.status) {
        case 401:
          ctx.status = 200
          ctx.body = {
            status: 401,
            result: {
              err: '请登录后再进行相关操作^_^',
              errInfo: '受保护的访问，需要登录后进行'
            }
          }
          break
        default:
          throw err
      }
    })
  }
}
