const cartModel = require("../../models/cartProduct");

const countAddToCartController=async(req,resp)=>{
   try{
     const userId=req.userId;

     const count=await cartModel.countDocuments({userId:userId});//find the userId which are given in schema of cartSchema and whaich are comes form auth.js

     resp.status(200).json({
      message:"Ok",
      data:{
        count:count
      },
      success:true,
      error:false
     })

     console.log(count);
   }
   catch(err){
      return resp.status(400).json({
        message:err.message||err,
        success:false,
        error:true
      })
   }
}
module.exports=countAddToCartController