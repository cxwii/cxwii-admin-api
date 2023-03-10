const express = require('express')
const app = express()

// 解决跨域
const cors = require('cors')
app.use(cors())

// 解决boyd内容为空
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ express: false }))
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }))

const loginRouter = require('./router/login')
app.use('/api', loginRouter)

app.listen(9528, () => {
  console.log('juejimcsApi server running at http://127.0.0.1:9528 :>>')
})
