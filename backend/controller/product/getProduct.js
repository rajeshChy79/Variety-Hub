const productModel=require("../../models/productModel")


const getProductController=async(req,resp)=>{
  try{
     const allProducts=await productModel.find().sort({createdAt:-1});

     resp.status(200).send({
      message:"All Products added successfully",
      success:true,
      error:false,
      data:allProducts
     })
  }
  catch(err){
     resp.status(400).send({
      message:err.message || err,
      error:true,
      success:false
     })
  }
}

module.exports=getProductController