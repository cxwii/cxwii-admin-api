const express = require('express')
const router = express.Router()
const userHandler = require('../routre_handler/userHandler')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/userSchema')

router.post('/regUser', expressJoi(reg_login_schema), userHandler.regUser)
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router
export {}