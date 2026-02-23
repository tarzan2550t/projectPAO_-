const conn = require('../config/db')


exports.assignmentlist = async (req,res,next)=>{
    try{
        const items = await conn('assigmments')
        .leftJoin('indicators' , 'assigmments.indicator_id'  ,'indicators.id')
        .leftJoin('users as evaluator' , 'assigmments.evaluator_id'  ,'evaluator.id')
        .select('assigmments.*' , 'indicators.name as indicator_name' , 'evaluator.name as evaluator_name')
        res.json(items)
    }catch(e){
        next(e)
    }
}
exports.createassignment = async (req,res,next)=>{
    try{
        console.log('Body:', req.body);
        const {	 evaluator_id  , indicator_id  , type } = req.body
        const examine = await conn('assigmments').where({  evaluator_id  , indicator_id  }).first()
        if(examine){const e = new Error('มีการมอบหมายนี้เเล้ว'); e.status = 401; return next(e)}
            const increase = await conn('assigmments').insert({ evaluator_id  , indicator_id  , type })
        res.json({success:true  , message:'complata'})
    }catch(e){
        next(e)
    }
}
exports.deleteassignment = async (req, res, next) => {
  try {
    const id = req.params.id    
    await conn('assigmments').where({ id }).del()
    res.json({ message: 'complete' })
    } catch (e) {   
    next(e)
    }
}
