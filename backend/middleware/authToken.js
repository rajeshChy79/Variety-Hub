const jwt=require('jsonwebtoken')
async function authToken(req,resp,next){
  try{
     const token=req.cookies?.token;
     if(!token){
      return resp.status(200).json({
        message:"user not login",
        error:true,
        success:false
      });
     }

     jwt.verify(token,process.env.TOKEN_SECRET_KEY,function(err,decoded){

      if (err) {
        return resp.status(403).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        }); 
      } 

      if (!decoded?._id) {
        return resp.status(403).json({
          message: "Invalid token data: Missing user ID",
          error: true,
          success: false,
        });
      }
            req.userId = decoded?._id;  // Initialize req.user before setting id
            next()
     })
  }
  catch(err){
    return resp.status(400).json({
      message:err.message || err,
      data:[],
      error:true,
      success:false 
    })
  }
}
module.exports=authToken