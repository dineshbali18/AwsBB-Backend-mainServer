const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
//   User.find({phoneNum:req.body.phoneNum}).exec((err,phon)=>{
//             if(phon){
//               return res.status(400).json({
//                   error:"Number has already linked with Other Email"
//                 });
//             }

//           })
//   User.find({email:req.body.email}).exec((err,email)=>{
//             if(email){
//               return res.status(400).json({
//                   error:"Number has already linked with Other Email"
//                 });
//             }

//           })
  const user=new User(req.body);//changed
  user.save((err, user) => {
    if (err) {
        console.log(err);
      return res.status(400).json({
        err: "Email or Phone Number had already linked with other Account"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, 'bigbossdineshbali');
    //put token in cookie
    // res.cookie("token", token, { expire: new Date() + 9000 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User signout successfully"
  });
};

//protected routes
// it adds an auth property in request object//very imp
exports.isSignedIn = expressJwt({
  secret:'bigbossdineshbali',
  userProperty: "auth",
  algorithms: ['sha1', 'RS256', 'HS256'],
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};
