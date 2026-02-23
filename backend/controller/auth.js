const conn = require('../config/db')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req,res,next)=>{
    try{
        const {name , email , password , department_id , group_id  , role = 'evaluatee'} = req.body
        const examine = await conn('users').where({email}).first()
        if(examine) {return res.status(401).json({success:false , message:'มีผู้ใช้เเล้ว'})}

        const password_hash = await bcrypt.hash(password , 10)

        const increase = await conn('users').insert({name , email , password : password_hash , department_id , group_id , role})
        res.json({success:true  , message:'complata'})
    }catch(e){
        next(e)
    }
}

exports.login = async (req,res,next)=>{
    try{
        console.log(req.body)
        const {email , password} = req.body
        const examine = await conn('users').where({email}).first()
        if(!examine){ const e = new Error('ไม่เจอบัญชี'); e.status = 404 ; return next(e)  }


        const password_hash = await bcrypt.compare(password , examine.password)
        if(!password_hash) {const e =  new Error('รหัสผ่านไม่ถูกต้อง'); e.status = 400 ; return next(e)  }


        const token = await jwt.sign({
            id:examine.id ,name: examine.name ,  role:examine.role , status: examine.status  , department: examine.department_id , image: examine.image  	
             } ,
            process.env.JWT_SECRETFILE ,
            {expiresIn:'2h'})
        res.json({success:true , token  })
    }catch(e){
        next(e)
    }
}


exports.department = async(req,res,next)=>{
    try{
        const items = await conn('departments').select()
        res.json(items)
    }catch(e){
        next(e)
    }
}

exports.group = async(req,res,next)=>{
    try{
        const items = await conn('org_groups').select()
        res.json(items)
    }catch(e){
        next(e)
    }
}

