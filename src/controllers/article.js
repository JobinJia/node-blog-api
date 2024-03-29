import Article from '../models/article'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

// 新增一篇文章
export let addArticle = async (ctx) => {
  try {
    let body = ctx.request.body
    let { dataValues } = await Article.create({
      title: body.title,
      content: body.content
    })
    ctx.body = {
      result: dataValues,
      name: ctx.params.name,
      msg: '成功',
      code: 200
    }
  } catch (e) {
    ctx.body = {
      result: e,
      name: ctx.params.name,
      msg: '保存数据失败',
      code: 500
    }
  }
}

// 逻辑删除文章
export let delArticle = async (ctx) => {
  try {
    let { id } = ctx.request.body
    let res = await Article.update({
      del: 1
    }, {
      where: {
        id: id,
        del: 0
      }
    })
    ctx.body = {
      result: res,
      name: ctx.params.name,
      msg: '删除成功',
      code: 200
    }
  } catch (e) {
    ctx.body = {
      result: e,
      name: ctx.params.name,
      msg: '删除失败',
      code: 500
    }
  }
}

// 更新文章
export let updArticle = async (ctx) => {
  try {
    let { id, title, content, tags, cate } = ctx.request.body
    let res = await Article.update(
      {
        title: title,
        content: content,
        tagId: tags,
        cateId: cate
      },
      {
        where: {
          id: id,
          del: 0
        }
      }
    )
    ctx.body = {
      result: res,
      name: ctx.params.name,
      msg: '更新成功',
      code: 200
    }
  } catch (e) {
    ctx.body = {
      result: e,
      name: ctx.params.name,
      msg: '更新失败',
      code: 500
    }
  }
}

// 获取所有文章
export let getArticle = async (ctx) => {
  try {
    let { pageNo, pageSize, title } = ctx.query
    let res = await Article.findAndCountAll({
      offset: (pageNo - 1) * pageSize,
      limit: Number(pageSize)
    }, {
      where: {
        del: 0,
        title: {
          [Op.like]: `%${title}%`
        }
      }
    })
    ctx.body = {
      result: res,
      name: ctx.params.name,
      msg: '更新失败',
      code: 500
    }
  } catch (e) {
    ctx.body = {
      result: e,
      name: ctx.params.name,
      msg: '更新失败',
      code: 500
    }
  }
}
