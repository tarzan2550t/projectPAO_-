const router = require('express').Router()
const assignments_controller = require('../controller/assigmments')

router.get('/assignmentlist' , assignments_controller.assignmentlist)
router.post('/createassignment' , assignments_controller.createassignment)
router.delete('/deleteassignment/:id' , assignments_controller.deleteassignment)


module.exports = router