const productModel = require('../../models/productModel');

const getCategoryWiseProduct = async(req,resp) => {
    try{
      const {category}=req?.body || req?.query;
      const products=await productModel.find({category});

      resp.status(200).json({
        data:products,
        error:false,
        success:true
      })
    }
    catch(err){
       return(
        resp.status(500).json({
          message:"product not found",
          error:true,
          success:false
        })
       )
    }
  
}

module.exports=getCategoryWiseProduct