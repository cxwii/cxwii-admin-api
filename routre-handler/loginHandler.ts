exports.login = (req, res) => {
  console.log('object :>> ', req.body);
  if (req.body.usernane == 'admin' && req.body.password == 123456) {
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
}