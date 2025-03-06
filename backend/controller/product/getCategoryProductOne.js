const productModel = require("../../models/productModel")

const getCategoryProductController=async(req,resp)=>{
  try{
     const productCategory=await productModel.distinct("category");

     //array to store one product from each category
     const productByCategory=[];

     for(const product of productCategory){
      const productFromCategory=await productModel.findOne({category:product});

      if(productFromCategory){
        productByCategory.push(productFromCategory);
      }
     }

     resp.status(200).json({
      message:"product by category",
      data:productByCategory,
      error:false,
      success:true
     })
  }
  catch(err){
    resp.status(400).json({
       message:err.message || err,
       error:true,
       success:false
    })
  }
}

module.exports=getCategoryProductController