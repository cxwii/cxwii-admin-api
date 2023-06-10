const express = require('express')
const router = express.Router()
const userInfoHandler = require('../routre_handler/userInfoHandler')
const expressJoi = require('@escook/express-joi')
const { updateUserInfo_schema, updatePassword_schema, updateAvatar_schema } = require('../schema/userSchema')

router.get('/getUserInfo', userInfoHandler.getUserInfo)
router.post('/updateUserInfo', expressJoi(updateUserInfo_schema), userInfoHandler.updateUserInfo)
router.post('/updatePassword', expressJoi(updatePassword_schema), userInfoHandler.updatePassword)
router.post('/updateAvatar', expressJoi(updateAvatar_schema), userInfoHandler.updateAvatar)

module.exports = router
export {}