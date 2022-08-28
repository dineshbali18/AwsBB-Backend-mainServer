const mongoose=require("mongoose");
const User=require("./user")
const otpSchema=new mongoose.Schema({
    otp:{
        type:String
    },
    email:{
        type:String,
        ref:"User"
    },
    createdAt:{
        type:Date,
        expires:'3600',
        default:Date.now
    }

})

module.exports=mongoose.model("otp",otpSchema);