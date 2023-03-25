const myDB = require('../sql/mysql')

exports.login = (req, res) => {
  myDB.query('select * from user', (err, results) => {
    if (err) {
      return console.log('mysql_err :>> ', err)
    }
    if (req.body.userName == results[0].userName && req.body.password == results[0].password) {
      res.send({
        status: 200,
        message: '登录成功'
      })
    } else {
      res.send({
        status: 500,
        message: '登录失败'
      })
    }
  })
}