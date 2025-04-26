const orderModel = require("../../models/orderModel")

const orderController=async(req,resp)=>{
  try{
    const orderDetails=await orderModel.find({userId:req.userId}).sort({createdAt:-1});
    console.log("order Details:",orderDetails);
    resp.status(200).json({
      order:orderDetails,
      success:true,
      error:false
    })
  }
  catch(err){
    resp.status(500).json({
      message:err.message,
      success:false,
      error:true
    })
  }
}

module.exports=orderController