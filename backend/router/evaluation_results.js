const router = require('express').Router()
const results_controller = require('../controller/evaluation_results')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
router.get('/getevaluationresultslist' , auth('evaluator') , results_controller.getevaluation_resultslist)
router.get('/getresultebyid' , auth('evaluatee') , results_controller.getresultebyid)
router.post('/createevaluationresults' , auth('evaluator'), upload.optionalSingle('file'), results_controller.createevaluation_results )

module.exports = router