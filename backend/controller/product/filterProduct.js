const productModel=require("../../models/productModel")
const filterProductController=async(req,resp)=>{
    try{
        const categoryList=req.body.category || [];
        const product=await productModel.find({
            category:{$in:categoryList}
        })

        resp.json({
            data:product,
            success:true,
            error:false,
            message:"product"
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
module.exports=filterProductController