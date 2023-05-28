const myDB = require('../db/mysql')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册
exports.regUser = (req, res) => {
  const userInfo = req.body
  
  myDB.query(
    'select * from user where username=?',
    userInfo.username,
    (err, results) => {
      if (err) return res.cc(err)
      if (results.length > 0) return res.cc('用户名被占用')

      userInfo.password = bcryptjs.hashSync(userInfo.password, 10)

      myDB.query(
        'insert into user set ?',
        {
          username: userInfo.username,
          password: userInfo.password
        },
        (err, results) => {
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('注册失败')

          res.send({ status: 200, message: '注册成功' })
        }
      )
    }
  )
}

// 登录
exports.login = (req, res) => {
  const userInfo = req.body

  myDB.query(
    'select * from user where username=?',
    userInfo.username,
    (err, results) => {
      if (err) return res.cc(err)
      if (results.length !== 1) return res.cc('登录失败')

      const compareResult =  bcryptjs.compareSync(userInfo.password, results[0].password)
      if(!compareResult) return res.cc('登录失败')

      const user = { ...results[0], password: '', userPic: '' }
      const tokenStr = jwt.sign(user, config.jwtSecretKey, {
        expiresIn: config.expiresIn
      })

      const data = {
        username: results[0].username,
        userPic: results[0].userPic,
        roleId: results[0].roleId
      }
      
      res.send({
        status: 200,
        message: '登录成功',
        data,
        token: 'Bearer ' + tokenStr
      })
    }
  )
}

export {}