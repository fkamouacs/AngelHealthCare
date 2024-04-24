const express = require('express')
const router = express.Router()
const EmailController = require('../controllers/email-controller')

router.get('/:user', EmailController.getAllEmailByUser)
router.post('/', EmailController.sendEmail)

module.exports = router