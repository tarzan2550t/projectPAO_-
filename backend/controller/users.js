const conn = require('../config/db')
const bcrypt = require('bcrypt')




exports.userlist = async (req, res, next) => {
  try {
    const user = await conn('users')
                            .leftJoin('departments' , 'users.department_id' , 'departments.id')
                            .leftJoin('org_groups' , 'users.group_id' , 'org_groups.id')
                            .whereIn('users.role', ['evaluatee', 'evaluator'])
                            .select('users.*' , 'departments.name as deprt_name' , 'org_groups.name as group_name')
    res.json(user)
  } catch (e) {
    next(e)
  }
}

exports.createuser = async (req, res, next) => {
  try {

    const { email, password, name, department_id, group_id, role } = req.body
    const user = await conn('users').where({ email }).first()
    if (user) { return res.status(400).json({ success: false, message: 'มีผู้ใช้บัญชีนี้เเล้ว' }) }

    const password_hash = await bcrypt.hash(password, 10)


    const adduser = await conn('users').insert({ email, password: password_hash, name, department_id, group_id, role })
    res.json({ success: true, message: "สร้างสำเร็จ" })
  } catch (e) {
    next(e)
  }
}

exports.deleteuser = async (req,res,next)=>{
    try{
        const id = req.params.id
        const deleuser = await conn('users').where({id}).del()
        res.status(200).json({message:'complata'})
    }catch(e){
        next(e)
    }
}

exports.edituser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, department_id, group_id, role, status } = req.body;

  try {
    // สร้าง object สำหรับ update
    const updateData = {
      name,
      email,
      department_id,
      group_id,
      role,
      status
    };

    // ถ้ามี password ให้ hash แล้วเพิ่มเข้า object
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // ทำ update
    const result = await conn('users')
      .where({ id })
      .update(updateData);

    if (result) {
      res.json({ success: true, message: 'User updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.getuserid = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await conn('users').where({ id }).first(); // ใช้ตัวแปร user แทน res
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.profile = async (req, res) => {
  try {
    // console.log(req.user)
    const userId = req.user.id

     const user = await conn('users')
                            .leftJoin('departments' , 'users.department_id' , 'departments.id')
                            .leftJoin('org_groups' , 'users.group_id' , 'org_groups.id')
                            .select('users.*' , 'departments.name as deprt_name' , 'org_groups.name as group_name')
      .where('users.id', userId)
      .first()

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.userevaluator = async (req, res, next) => {
  try {
    const evaluators = await conn('users').where({ role: 'evaluator' }).select('*');    
    res.json(evaluators);
  } catch (e) {
    next(e);
  }

}
exports.userevaluatee = async (req, res, next) => {
  try {
    const evaluatees = await conn('users')
    .leftJoin('departments', 'users.department_id', 'departments.id')
    .leftJoin('org_groups', 'users.group_id', 'org_groups.id')
    .where({ role: 'evaluatee' })
    .select('users.*', 'departments.name as department_name', 'org_groups.name as group_name');    
    res.json(evaluatees);
  } catch (e) {
    next(e);
  }
}

exports.deactivateuser = async (req, res, next) => {
  try {
    const id = req.params.id
    await conn('users').where({ id }).update({ status: '2' })
    res.json({ message: 'User deactivated successfully' })
  } catch (e) {
    next(e)
  }
}

exports.activateuser = async (req, res, next) => {
  try {
    const id = req.params.id
    await conn('users').where({ id }).update({ status: '1' })
    res.json({ message: 'User activated successfully' })
  }
    catch (e) { 
    next(e)
  }
}

