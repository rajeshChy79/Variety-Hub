const userModel = require('../../models/userModel.js')
async function allUsers(req,resp){
  try{

    const allUserDetails=await userModel.find();

    resp.send({
      message:"all users found successfully",
      data:allUserDetails,
      success:true,
      error:false
    })
  }
  catch(err){
    resp.status(400).send({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports=allUsers