import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import User from '../models/user'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

// 用户登录的时候返回token
// let token = jwt.sign({
//   userInfo: userInfo // 你要保存到token的数据
// }, publicKey, { expiresIn: '7d' })

/**
 * 检查授权是否合法
 */
export let CheckAuth = (ctx) => {
  let token = ctx.request.header.authorization
  try {
    let decoded = jwt.verify(token.substr(7), publicKey)
    if (decoded.userInfo) {
      return {
        status: 1,
        result: decoded.userInfo
      }
    } else {
      return {
        status: 403,
        result: {
          errInfo: '没有授权'
        }
      }
    }
  } catch (err) {
    return {
      status: 503,
      result: {
        errInfo: '解密错误'
      }
    }
  }
}

export let Post = (ctx) => {
  switch (ctx.params.action) {
    case 'check':
      return CheckAuth(ctx).then(result => {
        ctx.body = result
      })
    default:
      return CheckAuth(ctx).then(result => {
        ctx.body = result
      })
  }
}

export let login = async (ctx) => {
  let account = ctx.request.body.account
  let password = ctx.request.body.password
  let res = await User.findOne({
    account: account,
    password: password
  })
  let userInfo = res.dataValues
  // 生成token
  let token = null
  if (userInfo) {
    token = jwt.sign({
      userInfo: userInfo // 你要保存到token的数据
    }, publicKey, { expiresIn: '7d' })
  }
  // 存cookie
  ctx.cookies.set('Bearer', token, {
    domain: 'localhost',
    path: '/',
    maxAge: 2 * 60 * 60 * 1000,
    httpOnly: false
  })
  // let cokie = ctx.cookies.get('Bearer')
  // console.log(`cookie is ${cokie}`)
  // ctx.cookies.set('Bearer', token,
  //   {
  //     signed: true,
  //     domain: 'localhost', // 写cookie所在的域名
  //     path: '/', // 写cookie所在的路径
  //     maxAge: 2 * 60 * 60 * 1000, // cookie有效时长
  //     expires: 7, // cookie失效时间
  //     httpOnly: false, // 是否只用于http请求中获取
  //     overwrite: true, // 是否允许重写
  //     secure: false // 为true 则开启只允许https访问
  //   }
  // )
  let result = {
    userInfo: userInfo,
    token: token
  }
  ctx.body = {
    result: result,
    name: ctx.params.name,
    para: ctx.query
  }
}
