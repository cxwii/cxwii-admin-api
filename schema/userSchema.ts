const joi = require('joi')

const userId = joi.number().integer().min(1).required()
const username = joi.string().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const email = joi.string().email().required()
const userPic = joi.string().dataUri().required()

// 注册和登录的验证规则
exports.reg_login_schema = {
  body: {
    username,
    password
  }
}

// 更改用户信息的验证规则
exports.updateUserInfo_schema = {
  body: {
    userId,
    username,
    email
  }
}

// 更改用户信息列表的验证规则
exports.updateUserInfoList_schema = {
  body: {
    userId,
    username,
    email,
    userPic
  }
}

// 更改用户密码的验证规则
exports.updatePassword_schema = {
  body: {
    oldPad: password,
    newPad: joi.not(joi.ref('oldPad')).concat(password)
  }
}

// 更改用户头像的验证规则
exports.updateAvatar_schema = {
  body: {
    userPic
  }
}

export {}