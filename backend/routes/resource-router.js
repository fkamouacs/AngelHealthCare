const express = require('express')
const router = express.Router()
const ResourceController = require('../controllers/resource-controller')

router.post('/', ResourceController.createResource)
router.get('/:id', ResourceController.getResourceById)
router.delete('/:id', ResourceController.deleteResourceById)
router.get('/', ResourceController.getResourcePairs)
router.put('/:id', ResourceController.updateResourceById)







//THIS IS WRONG!!!!!
// router.get('/', ResourceController.createResource)
// router.get('/:id', ResourceController.getResourceById)
// router.delete('/:id', ResourceController.deleteResourceById)
// router.get('/resourcepairs/', ResourceController.getResourcePairs)
// router.put('/:id', ResourceController.updateResourceById)
// router.post('/availableResources', ResourceController.getAvailableResources)
// router.post('/availableResourceDate', ResourceController.getAvailableResourcesOnDate)
// router.post('/addResourceSchedule', ResourceController.addResourceSchedule)
// router.post('/removeResourceSchedule', ResourceController.removeResourceSchedule)

module.exports = router