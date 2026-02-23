const conn = require('../config/db')

exports.topiclist = async (req,res , next) =>{
    try{
        const items = await conn('evaluation_topics')
        .leftJoin('evluation_periods' , 'evaluation_topics.period_id' , 'evluation_periods.id')
        .select('evaluation_topics.*' , 'evluation_periods.name as period_name')
        res.json(items)
    }catch(e){
        next(e)
    }
}

exports.createtopic = async (req, res, next) => {
  try {
    console.log(req.body)
    const { period_id, name, description, weight } = req.body

    // validate เบื้องต้น
    if (!period_id || !name || !weight) {
      return res.status(400).json({
        message: 'กรุณากรอกข้อมูลให้ครบ'
      })
    }

    // insert ลง database
    await conn('evaluation_topics').insert({
      period_id,
      name,
      description,
      weight
    })

    res.status(201).json({
      message: 'สร้างหัวข้อการประเมินเรียบร้อย'
    })

  } catch (e) {
    next(e)
  }
}


exports.deletetopic = async (req, res, next) => {
  try {
    const id = req.params.id  
    await conn('evaluation_topics').where({ id }).del()
    res.json({ message: 'complete' })
  } catch (e) {
    next(e)
  }
}
