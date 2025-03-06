const userModel = require("../../models/userModel")

async function updateUser(req,resp){
  try{
    const sessionUser=req.userId
    const {userId,email,name,role}=req.body
    const payload={
      ...(email && {email:email}),
      ...(name && {name:name}),
      ...(role && {role:role})
    }

    const updateUser=await userModel.findByIdAndUpdate(userId,payload);

    const user=await userModel.findById(sessionUser);

    resp.json({
      message:"user updated",
      success:true,
      error:false
    })
  }
  catch(err){
    resp.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports=updateUser