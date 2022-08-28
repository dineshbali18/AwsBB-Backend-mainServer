const mongoose=require("mongoose");
const contestantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        default:0
    },
    photo: {
        data: Buffer,
        contentType: String,
        // required:true
    },
    image:{
        type:String
    },
    //role ===> nominated
    role:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("contestant",contestantSchema);
