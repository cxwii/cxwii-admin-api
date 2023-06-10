const myDB = require('../db/mysql')
const bcryptjs = require('bcryptjs')

// 获取用户信息
exports.getUserInfo = (req, res) => {
  myDB.query(
    'select userId, username, roleId, email, userPic from user where userId=?',
    req.auth.userId,
    (err, results) => {
      if(err) return res.cc(err)
      if(results.length !== 1) return res.cc('获取用户信息失败')

      res.send({
        status: 200,
        message: '获取用户信息成功',
        data: results[0]
      })
    }
  )
}

// 更改用户信息
exports.updateUserInfo = (req, res) => {
  myDB.query(
    'update user set ? where userId=?',
    [req.body, req.body.userId],
    (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('更新用户信息失败')

      res.cc('更新用户信息成功', 200)
    }
  )
}

// 更改用户密码(并非重置密码)
exports.updatePassword = (req, res) => {
  myDB.query(
    'select * from user where userId=?',
    req.auth.userId,
    (err, results) => {
      if(err) return res.cc(err)
      if(results.length !== 1) return res.cc('用户不存在')

      const compareResult = bcryptjs.compareSync(req.body.oldPad, results[0].password)
      if(!compareResult) return res.cc('旧密码错误')

      const newPad = bcryptjs.hashSync(req.body.newPad, 10)
      myDB.query(
        'update user set password=? where userId=?',
        [ newPad, req.auth.userId ],
        (err, results) => {
          if(err) return res.cc(err)
          if(results.affectedRows !== 1) return res.cc('更新密码失败')
          res.cc('更新密码成功', 200)
        }
      )
    }
  )
}

// 更改用户头像(base64)
exports.updateAvatar = (req, res) => {
  myDB.query(
    'update user set userPic=? where userId=?',
    [req.body.avatar, req.auth.userId],
    (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('更新用户头像失败')
      
      res.cc('更新用户头像成功', 200)
    }
  )
}

export {}