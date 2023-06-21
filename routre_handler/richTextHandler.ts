const myDB = require('../db/mysql')

// 获取富文本信息
exports.getRichText= (req, res) => {
  myDB.query(
    'select EditorText from rich_text where userId=?',
    req.auth.userId,
    (err, results) => {
      if(err) return res.cc(err)
      if(results.length <= 0) return res.cc('获取富文本信息失败')
      
      res.send({
        status: 200,
        message: '获取富文本信息成功',
        data: results[0]
      })
    }
  )
}

// 更改富文本信息
exports.updateRichText = (req, res) => {
  myDB.query(
    'update rich_text set ? where userId=?',
    [req.body, req.auth.userId],
    (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('更新富文本信息失败')

      res.cc('更新富文本信息成功', 200)
    }
  )
}

export {}