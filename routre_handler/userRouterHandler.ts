const myDB = require('../db/mysql')

// 获取路由信息
exports.getUserRouter= (req, res) => {
  myDB.query(
    'select children, component, meta, name, path, redirect from router where roleId=?',
    req.auth.roleId,
    (err, results) => {
      if(err) return res.cc(err)
      if(results.length < 0) return res.cc('获取路由信息失败')
      
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

export {}