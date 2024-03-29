const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  // console.log(req);
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.encry_password=undefined;
    req.salt=undefined;
    req.profile = user;
    next();
  });
};

exports.deleteEmail=(req,res,next,email)=>{
  console.log(email);
  req.email=email;
  next();
}

exports.deleteUser=(req,res)=>{
  User.deleteOne({email:req.email}).exec((err,user)=>{
    return res.json("deletion done");
  })
}


exports.getNameById=(req,res)=>{
  console.log("ccccccccccccccccccccccccccccccccccccccccccccccccc")
  var username={
  "name":req.profile.name
  }
  return res.json(username)
}


exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

// exports.deleteUser=(req,res)=>{
//   User.deleteOne({email:})
// }


