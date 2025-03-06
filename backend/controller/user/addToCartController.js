const cartModel = require("../../models/cartProduct");

const addToCartController=async(req,resp)=>{
  try{
    const {productId}=req?.body;
    const currentUser=req.userId;
    const product=await cartModel.findOne({productId});
    if(product){
      return resp.status(400).json({
        message:"product already available in cart",
        success:false,
        error:true
      })
    }

    const payload={
      productId:productId,
      quantity:1,
      userId:currentUser
    }

    const newAddToCart=new cartModel(payload);
    const saveProduct=await newAddToCart.save();

    resp.status(200).json({
      message:"product added to cart",
      data:saveProduct,
      success:true,
      error:false
    })
  }
  catch(err){
    resp.status(400).json({
      message:err.message || err,
      success:false,
      error:true
    })
  }
}
module.exports=addToCartController