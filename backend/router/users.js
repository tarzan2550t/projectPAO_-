const router = require('express').Router()
const users_controller = require('../controller/users')
const auth = require('../middleware/auth')

router.get('/userlist' , users_controller.userlist)
router.get('/userevaluator' , users_controller.userevaluator)
router.get('/userevaluatee' , users_controller.userevaluatee)
router.get('/getuserid/:id' , users_controller.getuserid)
router.get('/profile' , auth('evaluatee') , users_controller.profile)
router.post('/createuser' , users_controller.createuser)
router.put('/edituser/:id' , users_controller.edituser)
router.delete('/deleteuser/:id' , users_controller.deleteuser)
router.put('/deactivateuser/:id' , users_controller.deactivateuser)
router.put('/activateuser/:id' , users_controller.activateuser)

module.exports = router