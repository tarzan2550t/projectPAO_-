const conn = require('../config/db')


exports.createResult = async (req, res, next) => {
  try {
    console.log(req.body)
    const {  indicator_id, url , evaluation_value  , period_id } = req.body
    const evaluatee_id = req.user.id // มาจาก token

    // กรณีมี upload file (multer)
    const file_name = req.file ? req.file.originalname : null
    const storage_path = req.file ? req.file.path : null

    const data = {
     
      evaluatee_id,
      period_id,
      indicator_id,
      file_name,
      storage_path,
      url_name: url,
      self_assessment_score : evaluation_value,
      
    }

    await conn('attachments').insert(data)

    res.json({ message: 'Insert success' })
  } catch (err) {
    next(err)
  }
}

exports.getResultsByIndicator = async (req, res, next) => {
  try {
    const indicator_id = req.params.id

    const items = await conn('attachments')
      .leftJoin('users', 'attachments.evaluatee_id', 'users.id')
      .leftJoin('indicators', 'attachments.indicator_id', 'indicators.id')
      .where('attachments.indicator_id', indicator_id)

      // 🔥 ตัดรายการที่มีการประเมินแล้ว
      .whereNotExists(function () {
        this.select('*')
          .from('evaluation_results')
          .whereRaw('evaluation_results.indicator_id = attachments.indicator_id')
          .whereRaw('evaluation_results.evaluatee_id = attachments.evaluatee_id')
          .whereRaw('evaluation_results.period_id = attachments.period_id')
      })

      .select(
        'attachments.*',
        'users.name as evaluatee_name',
        'indicators.name as indicator_name'
      )

    res.json(items)
  } catch (err) {
    next(err)
  }
}
exports.getattachmentsByIndicator = async (req, res, next) => {
  try {
    const indicator_id = req.params.indicatorId
    const evaluatee_id = req.params.evaluateeId
    const items = await conn('attachments')
      .leftJoin('users', 'attachments.evaluatee_id', 'users.id')
      .leftJoin('indicators', 'attachments.indicator_id', 'indicators.id')
      .where({ indicator_id , evaluatee_id })
      .select('attachments.*', 'users.name as evaluatee_name' , 'indicators.* ')
    res.json(items)
  } catch (err) {
    next(err)
  }
}


