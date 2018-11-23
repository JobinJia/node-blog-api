import Tag from '../models/tag'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

// 新增标签
export let addTag = async (ctx) => {
  try {
    let body = ctx.request.body
    let { dataValues } = await Tag.create({
      tagName: body.tagName,
      icon: body.icon
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

// 逻辑标签
export let delTag = async (ctx) => {
  try {
    let { id } = ctx.request.body
    let res = await Tag.update({
      del: 1
    }, {
      where: {
        id: id
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

// 更新标签
export let updTag = async (ctx) => {
  try {
    let { id, tagName, icon } = ctx.request.body
    let res = await Tag.update(
      {
        tagName: tagName,
        icon: icon
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

// 获取所有标签
export let getTags = async (ctx) => {
  try {
    let { pageNo, pageSize, tagName } = ctx.query
    let res = await Tag.findAndCountAll({
      offset: (pageNo - 1) * pageSize,
      limit: Number(pageSize)
    }, {
      where: {
        del: 0,
        tagName: {
          [Op.like]: `%${tagName}%`
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
