const express=require("express");
const router=express.Router();


const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {generateOtp,verifyOtp,sendOtp}=require('../controllers/otp');
const { getUserById } = require("../controllers/user");

router.param("userId",getUserById);
router.post("/user/generateotp",generateOtp)
router.post("/user/sendotp",sendOtp);
router.post("/user/verifyotp",verifyOtp);



module.exports=router;