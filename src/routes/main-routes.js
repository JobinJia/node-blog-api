import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter()
const baseUrl = '/api/v1'
const mergeUrl = (url) => {
  return `${baseUrl}${url}`
}

router
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  }) // 以/public开头则不用经过权限认证
  // .all('/upload', controllers.upload.default)
  // .get('/api/:name', controllers.api.Get)
  // .post('/api/:name', controllers.api.Post)
  // .put('/api/:name', controllers.api.Put)
  // .del('/api/:name', controllers.api.Delect)
  // .post('/auth/:action', controllers.auth.Post)
  .post(mergeUrl('/user/login'), controllers.auth.login)
  .post(mergeUrl('/user/getUser'), controllers.user.getUser)
  .post(mergeUrl('/art/addArticle'), controllers.article.addArticle)
  .delete(mergeUrl('/art/delArticle'), controllers.article.delArticle)
  .put(mergeUrl('/art/updArticle'), controllers.article.updArticle)
  .get(mergeUrl('/art/getArticle'), controllers.article.getArticle)

module.exports = router
