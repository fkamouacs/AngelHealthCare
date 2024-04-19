const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/account-controller')

router.get('/', AccountController.getAllAccounts)
router.get('/:id', AccountController.getAccountById)
router.get('/availableAccounts', AccountController.getAvailableAccounts)
router.get('/availableAccountsDate', AccountController.getAvailableAccountsOnDate)
router.get('/removeAccountSchedule', AccountController.removeAccountSchedule)
router.post('/', AccountController.addAccount)
router.post('/addAccountSchedule', AccountController.addAccountSchedule)
router.put('/updateProcedureStaffDate', AccountController.updateProcedureStaffDate)
router.post('/archiveAccount', AccountController.archiveAccount)
router.post('/unarchiveAccount', AccountController.unarchiveAccount)

module.exports = router