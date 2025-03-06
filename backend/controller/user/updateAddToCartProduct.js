const cartModel = require("../../models/cartProduct");

const updateAddToCartProduct=async(req,resp)=>{
    try{
       const currentUserId=req.userId;
       const addToCartProductId=req.body._id
       const qty=req.body.quantity

       const updateProduct=await cartModel.updateOne({_id:addToCartProductId},{
        ...(qty && {quantity:qty})
       })

       resp.json({
        message:"product updated",
        data:updateProduct,
        success:true,
        error:false
       })
    }
    catch(err){
        resp.json({
          message:err.message|| err,
          error:true,
          success:false
        })
    }
}
module.exports=updateAddToCartProduct