const router = require('express').Router()
const indicator_controller = require('../controller/indicator')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

router.get('/indicatorlist' ,  indicator_controller.indecatorlist)
router.get('/getindicator/:id' , auth('evaluatee') ,  indicator_controller.getindicator)
router.get('/getindicatorbyid/:id' , indicator_controller.getindicatorbyid)
router.post('/createindicator' ,upload.optionalSingle('file')   , indicator_controller.createindicator)
router.delete('/deleteindicator/:id' , indicator_controller.deleteindicator)
router.get('/indicatorbyevaluator' , auth('evaluator') , indicator_controller.getindicatorevaluator)
module.exports = router