const userModel = require("../../models/userModel");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function userSignInController(req,resp){
   try{
      const {email,password}=req.body;
      const user=await userModel.findOne({email});
      if(!user){
        throw new Error("user not register");
      }

      if(!email){
        throw new Error("Invalid Email");
      }
      if(!password){
        throw new Error("Invalid Password");
      }

      const checkPassword=await bcrypt.compare(password,user.password);
      if(checkPassword){
        const tokenData={
          _id:user._id,
          email:user.email
        }
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn:60*60*8});
        const tokenOption={
          httpOnly:true,
          secure:true
        }
        resp.cookie("token",token,tokenOption).status(200).json({
          message:"Login successfully",
          data:token,
          success:true,
          error:false
        })
      }
      else{
        throw new Error("Invalid password");
      }
   }
   catch(err){
    return resp.status(500).send({
      message:err.message||err,
      error:true,
      success:false
    })
   }
}

module.exports=userSignInController