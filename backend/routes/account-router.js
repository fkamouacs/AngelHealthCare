const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/account-controller')

router.post('/availableAccounts', AccountController.getAvailableAccounts)
router.get('/availableAccountsDate', AccountController.getAvailableAccountsOnDate)
router.put('/removeAccountSchedule', AccountController.removeAccountSchedule)
router.put('/addAccountSchedule', AccountController.addAccountSchedule)
router.put('/updateProcedureStaffDate', AccountController.updateProcedureStaffDate)

module.exports = router