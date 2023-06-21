const myDB = require('../db/mysql')

// 获取静态图表信息
exports.getStaticChartOption= (req, res) => {
  myDB.query(
    'select * from static_chart where chartName=?',
    req.body.chartName,
    (err, results) => {
      if(err) return res.cc(err)
      if(results.length <= 0) return res.cc('获取静态图表信息失败')
      
      const data = results.map((item) => ({
        chartName: item.chartName,
        chartOption: JSON.parse(item.chartOption),
        chartJsonMap: JSON.parse(item.chartJsonMap)
      }))

      res.send({
        status: 200,
        message: '获取静态图表信息成功',
        data
      })
    }
  )
}

export {}