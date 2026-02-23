const router = require('express').Router()
const upload = require('../middleware/upload')
const attachments_controller = require('../controller/attachments')
const auth = require('../middleware/auth');
router.post('/createattachments' , auth('evaluatee'),  upload.optionalSingle('file'),attachments_controller.createResult )
router.get('/getattachments/:id' , auth('evaluator'), attachments_controller.getResultsByIndicator )
router.get('/getattachment/:indicatorId/:evaluateeId' , auth('evaluator'), attachments_controller.getattachmentsByIndicator )


module.exports = router