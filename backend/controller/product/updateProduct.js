const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission")

async function updateProductController(req,resp){
  try{
      if(!uploadProductPermission(req.userId)){
          throw new Error("permission denied");
      }


      const {_id,...resBody}=req.body;
      const updatedProduct=await productModel.findByIdAndUpdate(_id,resBody);

      resp.status(200).send({
        message:"product updated successfully",
        error:false,
        success:true,
        data:updatedProduct
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

module.exports=updateProductController