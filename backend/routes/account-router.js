const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/account-controller')

router.post('/', AccountController.getAllAccounts)
router.post('/availableAccounts', AccountController.getAvailableAccounts)
router.post('/availableAccountsDate', AccountController.getAvailableAccountsOnDate)
router.post('/removeAccountSchedule', AccountController.removeAccountSchedule)
router.post('/addAccountSchedule', AccountController.addAccountSchedule)
router.put('/updateProcedureStaffDate', AccountController.updateProcedureStaffDate)
router.post('/archiveAccount', AccountController.archiveAccount)
router.post('/unarchiveAccount', AccountController.unarchiveAccount)

module.exports = router