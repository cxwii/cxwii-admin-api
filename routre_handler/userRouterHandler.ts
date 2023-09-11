const myDB = require('../db/mysql')

// 获取路由信息(后端传递表)
exports.getUserRdRouter= (req, res) => {
  myDB.query(
    'select children, component, meta, name, path, redirect from router_Rd where roleId=?',
    req.auth.roleId,
    (err, results) => {
      if(err) return res.cc(err)
      if(results.length <= 0) return res.cc('获取路由信息失败')
      const data = results.map((item) => ({
        children: JSON.parse(item.children),
        component: item.component,
        meta: JSON.parse(item.meta),
        name: item.name,
        path: item.path,
        redirect: item.redirect
      }))

      res.send({
        status: 200,
        message: '获取路由信息成功',
        data
      })
    }
  )
}

// 获取路由信息(code过滤表)
exports.getUserCodeRouter= (req, res) => {
  myDB.query(
    'select codes from router_Code where userId=?',
    req.auth.userId,
    (err, results) => {
      if(err) return res.cc(err)
      if(results.length <= 0) return res.cc('获取路由信息失败')

      res.send({
        status: 200,
        message: '获取路由信息成功',
        data: JSON.parse(JSON.parse(JSON.stringify(results))[0].codes)
      })
    }
  )
}

export {}