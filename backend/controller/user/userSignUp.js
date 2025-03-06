const userModel=require('../../models/userModel.js');
const bcrypt=require("bcryptjs");
async function userSignUpController(req,resp){
  try{
    const {name,email,password}=req.body;
    const userEmail=await userModel.findOne({email});
    if(userEmail){
      throw new Error("user already exists");
    }

    if(!name){
      throw new Error("name is required");
    }
    if(!email){
      throw new Error("email is required");
    }
    if(!password){
      throw new Error("password is required");
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    if(!hashedPassword) throw new Error("something is wrong");
    const payload={
        ...req.body,
        role:"GENERAL",
        password:hashedPassword
    }
    const userData=new userModel(payload);
    const user=await userData.save();
    return resp.status(200).json({
      message:"user created successfully",
      success:true,
      error:false,
      userData:user
    })
  }
  catch(err){
      return resp.status(500).json({
        message:err.message || err,
        error:true,
        success:false
      })
  }
}

module.exports=userSignUpController