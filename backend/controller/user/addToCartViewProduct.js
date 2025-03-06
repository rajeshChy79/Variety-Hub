const cartModel = require("../../models/cartProduct");

const addToCartViewProduct=async(req,resp)=>{
    try{
      const currentUser=req.userId;

      const allProducts=await cartModel.find({
       userId:currentUser
      }).populate("productId")

      resp.json({
       message:"Product added to cart",
       data:allProducts,
       success:true,
       error:false
      })
    }
    catch(err){
        return resp.status(400).json({
          message:err.message || err,
          success:false,
          error:true
        })
    }
}
module.exports=addToCartViewProduct