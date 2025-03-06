const productModel = require("../../models/productModel")

const getProductDetails=async(req,resp)=>{
    try{
      const {productId}=req.body
      const product=await productModel.findById(productId)
      resp.status(200).json({
        error:false,
        success:true,
        data:product
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
module.exports=getProductDetails