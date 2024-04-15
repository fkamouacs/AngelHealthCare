const express = require('express')
const router = express.Router()
const ResourceController = require('../controllers/resource-controller')

router.post('/', ResourceController.createResource)
router.get('/:id', ResourceController.getResourceById)
router.delete('/:id', ResourceController.deleteResourceById)
router.get('/', ResourceController.getResourcePairs)
router.put('/:id', ResourceController.updateResourceById)

module.exports = router