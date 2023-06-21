const myDB = require('../db/mysql')

// 获取动态图表信息
export const getDynamicChartOption = (ws, data) => {
  myDB.query(
    'select * from dynamic_chart where chartName=?',
    data,
    (err, results) => {

      if (results.length <= 0) {
        ws.send('动态图表信息查询失败')
      } else {
        const data = results.map((item) => {
          let random = parseInt((Math.random() * 5) as any)

          return {
            chartName: item.chartName,
            chartOption: JSON.parse(item.changeChartOption)[random],
            chartJsonMap: JSON.parse(item.chartJsonMap)
          }
        })
        ws.send(JSON.stringify(data))
      }
    }
  )
}