const cartModel = require("../../models/cartProduct")

const deleteAddToCartProduct=async(req,resp)=>{
    try{
       const currentUserId=req.userId
       const productId=req.body._id
       console.log("current Id:",currentUserId,"productId:",productId);
       const deleteProduct = await cartModel.deleteOne({ userId: currentUserId, _id: productId });

       if (deleteProduct.deletedCount === 0) {
         return resp.json({
           message: "Product not found or already removed",
           success: false,
           error: true
         });
       }
       
       resp.json({
        message:"product deleted from add to cart",
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
module.exports=deleteAddToCartProduct;