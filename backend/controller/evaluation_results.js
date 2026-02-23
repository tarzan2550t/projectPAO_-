const conn = require('../config/db')

exports.createevaluation_results = async (req,res,next)=>{
  try{
      console.log(req.body)
      const evaluator_id = req.user.id // มาจาก token
      console.log(req.file)
          const file_name = req.file ? req.file.originalname : null

        const {	 period_id  , indicator_id  , evaluatee_id  , score  , comment  } = req.body
        const examine = await conn('evaluation_results').where({ period_id  , indicator_id  , evaluatee_id  }).first()
        if(examine){const e = new Error('มีการประเมินนี้เเล้ว'); e.status = 401; return next(e)}
            const increase = await conn('evaluation_results').insert({ period_id  , indicator_id  , evaluator_id , evaluatee_id	    , score  , comment , signature_path : file_name   })
      res.json({success:true  , message:'complata'})
  }
    catch(e){
        next(e)
    }
}

exports.getevaluation_resultslist = async (req,res,next)=>{
    try{
        const items = await conn('evaluation_results')
        .leftJoin('indicators' , 'evaluation_results.indicator_id'  ,'indicators.id')
        .leftJoin('users as evaluator' , 'evaluation_results.evaluator_id'  ,'evaluator.id')
        .leftJoin('users as evaluatee' , 'evaluation_results.evaluatee_id'  ,'evaluatee.id')
        .select('evaluation_results.*' , 'indicators.name as indicator_name' , 'evaluatee.name as evaluatee_name' , 'evaluator.name as evaluator_name')
        res.json(items)
    }catch(e){
        next(e)
    }       
}
