const express = require('express')
const router = express.Router()
const richTextHandler = require('../routre_handler/richTextHandler')

router.get('/getRichText', richTextHandler.getRichText)
router.post('/updateRichText', richTextHandler.updateRichText)

module.exports = router
export {}