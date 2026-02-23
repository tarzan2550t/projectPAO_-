const conn = require('../config/db')

exports.periodlist = async (req,res,next)=>{
    try{
        const periods = await conn('evluation_periods').select()
        res.json(periods)
    }catch(e){
        next(e)
    }
}

exports.periodid = async (req,res,next)=>{
    try{
        const id = req.params.id
        const period = await conn('evluation_periods').where({id}).first()
        res.json(period)
    }catch(e){
        next(e)
    }
}
exports.periodopen = async (req,res,next)=>{
    try{
        const periods = await conn('evluation_periods').where({status:1}).select()
        res.json(periods)
    }catch(e){
        next(e)
    }
}

exports.createperiod = async (req,res,next)=>{
    try{
        console.log(req.body);
        const {name , year , start_date , end_date } = req.body
        const examine = await conn('evluation_periods').where({name}).first()
        if(examine){const e = new Error('มีหัวข้อนี้เเล้ว'); e.status = 401; return next(e)}

          const increase = await conn('evluation_periods').insert({name , year , start_date   , end_date   })
        res.json({success:true  , message:'complata'})
    }catch(e){
        next(e)
    }
}

exports.deleteperiod = async (req, res, next) => {
  try {
    const id = req.params.id
    await conn('evluation_periods').where({ id }).del()
    res.json({ message: 'complete' })
  } catch (e) {
    next(e)
  }
}
