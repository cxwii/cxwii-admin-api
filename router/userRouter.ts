const express = require('express')
const router = express.Router()
const userRouterHandler = require('../routre_handler/userRouterHandler')

router.get('/getUserRouter', userRouterHandler.getUserRouter)

module.exports = router
export {}