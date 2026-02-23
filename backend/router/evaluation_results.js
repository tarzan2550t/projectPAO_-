const router = require('express').Router()
const results_controller = require('../controller/evaluation_results')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

router.post('/createevaluationresults' , auth('evaluator'), upload.optionalSingle('file'), results_controller.createevaluation_results )

module.exports = router