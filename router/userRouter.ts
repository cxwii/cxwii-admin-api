const express = require('express')
const router = express.Router()
const userRouterHandler = require('../routre_handler/userRouterHandler')

router.get('/getUserRdRouter', userRouterHandler.getUserRdRouter)
router.get('/getUserCodeRouter', userRouterHandler.getUserCodeRouter)

module.exports = router
export {}