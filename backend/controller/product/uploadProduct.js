const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel")

async function uploadProductController(req,resp){
    try{
      const sessionUserId=req.userId;
      if(!uploadProductPermission(sessionUserId)){
        throw new Error("permission Denied")
      }
        const uploadProduct=new productModel(req.body);
        const saveProduct=await uploadProduct.save();

        resp.status(200).send({
          message:"Product saved successfully",
          error:false,
          success:true,
          data:saveProduct
        })
    }
    catch(err){
      resp.status(400).send({
          message:err.message,
          error:true,
          success:false
      })
    }
}

module.exports=uploadProductController;