const express = require('express')
const router = express.Router()
const chartHandler = require('../routre_handler/chartHandler')

router.post('/getStaticChartOption', chartHandler.getStaticChartOption)

module.exports = router
export {}