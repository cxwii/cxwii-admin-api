const express = require('express')
const cors = require('cors')
const app = express()
const joi = require('joi')
const { expressjwt: jwt } = require("express-jwt")
const config = require('./config')
const http = require("http")
const WS_MODULE = require("ws")
const myDB = require('./db/mysql')

app.use(cors())
// base64过长的问题解决limit:'600mb'
app.use(express.json({limit:'600mb'}))
app.use(express.urlencoded({ extended: false, limit:'600mb' }))

// 错误处理函数
app.use((req, res, next) => {
  res.cc = function (err, status = 500) {
    // 存储错误信息
    if (status == 500) {
      let time = new Date( )
      myDB.query(
        'insert into errorinfo set ?',
        {
          errorTime: time,
          errorInfo: err
        },
        (err, results) => {}
      )
      res.send({
        status,
        message: err instanceof Error ? err.message : err
      })
    } else {
      res.send({
        status,
        message: err instanceof Error ? err.message : err
      })
    }
  }
  next()
})

app.use(jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [ /^\/api/, "/regUser", "/login" ] }))

// 注册各种路由
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const userRouterRouter = require('./router/userRouter')
const chartRouter = require('./router/chart')
const richTextRouter = require('./router/richText')
app.use(userRouter)
app.use(userInfoRouter)
app.use(userRouterRouter)
app.use(chartRouter)
app.use(richTextRouter)
// 带api的不用token,正式环境中删掉
app.use('/api', userRouter)
app.use('/api', userInfoRouter)
app.use('/api', userRouterRouter)
app.use('/api', chartRouter)
app.use('/api', richTextRouter)

app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.status === 401) return res.cc('token过期', 401)
  if (err.name ===  'UnauthorizedError') return res.cc('token验证失败')
  res.cc(err)
})

const server = http.createServer(app)

import { time } from 'console'
// webSocket中查询数据库的方法
import { getDynamicChartOption } from './webSocket_handler/chartHandler'

const wss = new WS_MODULE.Server({ server })
wss.on("connection", (ws) => {
  ws.on('error', console.error)

  ws.on("message", (data) => {
    setInterval(() => {
      getDynamicChartOption(ws, data.toString())
    }, 3000)
  })
})

server.listen(9528, () => {
  console.log('cxwii_Admin server running at http://127.0.0.1:9528')
})

export {}