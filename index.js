const express=require("express")
// require('dotenv').config()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cors=require("cors")


const app=express();
app.use(bodyParser.json())
app.use(cors());

var port=`5000`


mongoose
  .connect('mongodb+srv://Bali:DiNeSh5@cluster0.xxcpi1d.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e)=>{
      console.log(e);
      console.log("DB NOT CONNECTED SUCCESFULLY");
  });


const contestantRoutes=require("./routes/contestant")
const userRoutes=require("./routes/user")
const authRoutes=require("./routes/auth")
const otpRoutes=require("./routes/otp")
const voteRoutes=require("./routes/votes");

app.use("/api",contestantRoutes);
app.use("/api",userRoutes)
app.use("/api",authRoutes);
app.use("/api",otpRoutes);
app.use("/api",voteRoutes);




app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})