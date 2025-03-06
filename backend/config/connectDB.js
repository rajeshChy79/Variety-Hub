const mongoose=require("mongoose");

async function connectDB(){
  try{
      await mongoose.connect(process.env.MONOGODB_URI);
      console.log("mongo DB connected successfully");
  }
  catch(err){
      console.log(`mongo db not connected ${err}`);
  }
}

module.exports=connectDB;