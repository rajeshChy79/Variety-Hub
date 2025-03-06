const productModel = require("../../models/productModel");
const searchProduct=async(req,resp)=>{
    try{
       const query=req.query.q;

       const regex=new RegExp(query,'i','g');
       const product=await productModel.find({
        $or:[
          {
            productName:regex
          },
          {
            category:regex
          }
        ]
       })

       resp.json({
        data:product
       })
    }
    catch(err){
      resp.json({
        message:err.message || err,
        success:false,
        error:true
      })
    }
}
module.exports=searchProduct