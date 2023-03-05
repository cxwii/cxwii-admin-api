const express = require('express')
const router = express.Router()
const loginHandler = require('../routre-handler/loginHandler')

router.post('/login', loginHandler.login)

module.exports = router

// ts编辑器报错?
export {}