const router = require('express').Router()
const topic_controller = require('../controller/topic')

router.get('/topiclist' , topic_controller.topiclist)
router.post('/createtopic' , topic_controller.createtopic)

router.delete('/deletetopic/:id' , topic_controller.deletetopic)


module.exports = router