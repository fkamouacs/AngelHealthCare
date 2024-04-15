const express = require('express')
const router = express.Router()
const ResourceController = require('../controllers/resource-controller')

// router.post('/', ResourceController.createResource)
// router.get('/:id', ResourceController.getResourceById)
// router.delete('/:id', ResourceController.deleteResourceById)
// router.get('/', ResourceController.getResourcePairs)
// router.put('/:id', ResourceController.updateResourceById)
router.get('/resource/', ResourceController.createResource)
router.get('/resource/:id', ResourceController.getResourceById)
router.delete('/resource/:id', ResourceController.deleteResourceById)
router.get('/resourcepairs/', ResourceController.getResourcePairs)
router.put('/resource/:id', ResourceController.updateResourceById)
router.post('/availableResource', ResourceController.getAvailableResources)
router.post('/availableResourceDate', ResourceController.getAvailableResourcesOnDate)

module.exports = router