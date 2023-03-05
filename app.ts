const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }))

const loginRouter = require('./router/login')
app.use('/api', loginRouter)

app.listen(9529, () => {
  console.log('juejimcsApi server running at http://127.0.0.1:9529 :>>')
})
