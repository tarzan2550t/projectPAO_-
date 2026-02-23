const router = require('express').Router()
const period_controller = require('../controller/period')

router.get('/periodlist' , period_controller.periodlist)
router.get('/periodid/:id' , period_controller.periodid)
router.get('/periodopen' , period_controller.periodopen)
router.post('/createperiod' , period_controller.createperiod)
router.delete('/deleteperiod/:id' , period_controller.deleteperiod)



module.exports = router