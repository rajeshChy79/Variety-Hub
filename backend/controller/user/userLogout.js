async function userLogout(req,resp){
    try{
        resp.clearCookie("token");

        resp.json({
          message:"Logged out successfully",
          error:false,
          success:true,
          data:[]
        })
    }
    catch(err){
      return resp.json({
        message:err.message||err,
        error:true,
        success:false
      })
    }
}

module.exports=userLogout