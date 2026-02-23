const conn = require('../config/db')
const { department } = require('./auth')

exports.indecatorlist = async (req,res,next)=>{
    try{
        const items = await conn('indicators')
        .leftJoin('evluation_periods' , 'indicators.period_id'  ,'evluation_periods.id')
        .leftJoin('departments' , 'indicators.department_id'  ,'departments.id')
        .select('indicators.*' , 'evluation_periods.name as topic_name'  , 'departments.name as dprt_name')
        res.json(items)
    }catch(e){
        next(e)
    }
}

exports.createindicator = async (req, res, next) => {
  try {
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const { period_id, name, description, evaluation_type, weight, url  , department_id} = req.body;

    // ตรวจสอบ file ก่อนใช้ replace
    const assemble_file = req.file && req.file.path
      ? req.file.path.replace(/\\/g, '/').split('uploads/')[1]
      : null;

    // ตรวจสอบ input ที่จำเป็น
    if (!name || !period_id || !description || !evaluation_type || !weight) {
      return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ' });
    }

    const examine = await conn('indicators').where({ name , period_id  }).first();
    if (examine) {
      return res.status(401).json({ message: 'มีหัวข้อนี้เเล้ว' });
    }

    await conn('indicators').insert({
      name,
      period_id,
      description,
      type: evaluation_type,
      weight,
      assemble_file,
      assemble_url: url || null,
      department_id
    });

    res.json({ success: true, message: 'Indicator created successfully' });
  } catch (e) {
    next(e);
  }
};


exports.deleteindicator = async (req, res, next) => {
  try {
    const id = req.params.id    
    await conn('indicators').where({ id }).del()
    res.json({ message: 'complete' })
    } catch (e) {

    next(e)
  }
}


exports.getindicator = async (req, res, next) => {
  try {
    const user_id = req.user.id
    const department_id = req.user.department
    const period_id = req.params.id

    // 🔍 เช็คก่อนว่า user นี้ประเมินรอบนี้ไปแล้วหรือยัง
    const exist = await conn("attachments")
      .where({
        evaluatee_id: user_id,
        period_id: period_id
      })
      .first()

    if (exist) {
      return res.status(400).json({
        message: "คุณได้ทำการประเมินรอบนี้ไปแล้ว"
      })
    }

    // ✅ ถ้ายังไม่เคยประเมิน → ค่อยดึง indicator
    const item = await conn("indicators")
      .leftJoin("evluation_periods", "indicators.period_id", "evluation_periods.id")
      .where({
        "indicators.period_id": period_id,
        "indicators.department_id": department_id
      })
      .select("indicators.*", "evluation_periods.name as topic_name")

    res.json(item)

  } catch (e) {
    next(e)
  }
}

exports.getindicatorevaluator = async (req, res, next) => {
  try {
    
    console.log(req.user)
    // const id = req.user.id
    const evaluator_id = req.user.id
    const item =  await conn('assigmments')
    .leftJoin('indicators', 'assigmments.indicator_id', 'indicators.id')
    .leftJoin('evluation_periods', 'indicators.period_id', 'evluation_periods.id')
    .where({ 'assigmments.evaluator_id': evaluator_id }).select('assigmments.*', 'indicators.*', 'evluation_periods.name as topic_name')
    res.json(item)
    } catch (e) {
    next(e)
    }
}
exports.getindicatorbyid = async (req, res, next) => {
  try {
    const id = req.params.id    
    const item =  await conn('indicators')
    .leftJoin('evluation_periods', 'indicators.period_id', 'evluation_periods.id')
    .where({ 'indicators.id': id }).select('indicators.*', 'evluation_periods.name as topic_name')
    res.json(item)
    } catch (e) {
    next(e)
    }
}


