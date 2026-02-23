const router = require('express').Router()
const auth_controller = require('../controller/auth')

router.post('/login'  , auth_controller.login)
router.post('/register'  , auth_controller.register)

router.get('/departmentlist' , auth_controller.department)
router.get('/grouplist' , auth_controller.group)



module.exports = router