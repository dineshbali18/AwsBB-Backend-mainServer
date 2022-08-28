const mongoose=require("mongoose")
// const contestant = require("../models/contestant")
const otp=require("../models/otp")
var nodemailer = require('nodemailer');


exports.generateOtp=(req,res)=>{
  console.log("hehe",req.body.email);
    var otp1=Math.floor(100000 + Math.random() * 900000);
    otp.find({email:req.body.email}).exec((err,otp1)=>{
        if(err){
            error:"Invalid Request"
        }
        if(otp1.length>0){
        otp.deleteOne({user:req.body.email}).exec((err)=>{
            if(err){
                error:"unable to perform del operation"
            }
        })
    }
    })

    const otpData = new otp({
        otp:otp1,
        email:req.body.email
    });
  otpData.save((err, otpData) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save otpData in DB"
      });
    }
  });
  res.json(otpData)
}

exports.sendOtp=(req,res)=>{
    //SEND Otp through MAIL
    console.log("sendOtp",req.body.email);
    var send_otp;
    otp.find({email:req.body.email}).exec((err,userOtp)=>{
        if(err){
            error:"Invalid"
        }
        if(userOtp.length>0){
          console.log(userOtp);
        send_otp=userOtp[0].otp;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'bigboss5teluguvoting@gmail.com',
          pass: 'DiNeSh5@'
        }
      });
      
      var mailOptions = {
        from: 'BigBoss6telugu<bigboss5teluguvoting@gmail.com>',
        to: req.body.email,
        subject: 'Otp for Bigboss 6 telugu',
        text: `Your Otp is ${send_otp}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.json("otp sent")
    }
  })
}

exports.verifyOtp=(req,res)=>{
  console.log(req.body);
    otp.find({email:req.body.email}).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error: "INVALID OTP"
            })
        }
        if(cate==null||cate.length==0){
          return res.send("Otp Expired");
        }
        console.log(cate[0]);
        if(req.body.otp==cate[0].otp){
          console.log("sucess");
            return res.send("sucess")
        }
        else{
            res.send("InCorrect OTP");
        }
    })
}