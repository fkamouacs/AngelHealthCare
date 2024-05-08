const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/account-controller')

router.get('/', AccountController.getAllAccounts)
router.get('/:id', AccountController.getAccountById)
router.get('/verify/:email/:key', AccountController.verifyAccount)
router.post('/availableAccounts', AccountController.getAvailableAccounts)
router.post('/availableAccountsDate', AccountController.getAvailableAccountsOnDate)
router.post('/removeAccountSchedule', AccountController.removeAccountSchedule)
router.post('/', AccountController.addAccount)
router.post('/addAccountSchedule', AccountController.addAccountSchedule)
router.put('/updateProcedureStaffDate', AccountController.updateProcedureStaffDate)
router.post('/archiveAccount', AccountController.archiveAccount)
router.post('/unarchiveAccount', AccountController.unarchiveAccount)
router.put('/:id', AccountController.updateAccountById)

module.exports = router