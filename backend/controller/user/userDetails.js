const userModel=require("../../models/userModel")
async function userDetailsController(req,resp){
      try{
         const user=await userModel.findById(req.userId)


         resp.status(200).json({
          user:user,
          error:false,
          message:"user details",
          success:true
         })
      }
      catch(err){
        return resp.status(400).json({
          message:err.message || err,
          error:true,
          success:false
        })
      }
}

module.exports=userDetailsController