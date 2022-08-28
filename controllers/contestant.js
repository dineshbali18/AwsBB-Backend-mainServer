const mongoose=require("mongoose")
// const contestant = require("../models/contestant")
const formidable=require("formidable")
const contestant=require("../models/contestant")
const fs = require("fs");
const path=require("path")

exports.getContestantById=(req,res,next,id)=>{
    contestant.findById(id).exec((err, cont) => {
        if (err || !cont) {
          return res.status(400).json({
            error: "No user was found in DB"
          });
        }
        req.contestant = cont;
        next();
      });
};

exports.getVoteCount=(req,res,next,votes)=>{
    req.votecount=votes;
    next();
}

exports.getAllContestants=(req,res)=>{
  contestant.find().exec((err,contestants1)=>{
    if (err || !contestants1) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    res.json({contestants1})
  })
}

exports.getContestantIdByName=(req,res)=>{
  // console.log("hi")
  contestant.find({name:req.body.name}).exec((err, cont) => {
      if (err || !cont) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      req.id1 = cont[0]._id;
      var contestant_id1=req.id1;
      res.json({contestant_id1});
    });
};

exports.createContestant=(req,res)=>{
    const new_contestant=new contestant(req.body)
    new_contestant.save((err,contestant)=>{
        if (err) {
            return res.status(400).json({
              error: "NOT able to save contestantin DB"
            });
          }
          res.json({ contestant});
    })
}
/////////////////////
// exports.createContestant = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "problem with image"
//       });
//     }
//     //destructure the fields
//     console.log(fields);
//     const { name, votes } = fields;

//     if (!name) {
//       return res.status(400).json({
//         error: "Please include all fields"
//       });
//     }

//     let new_contestant = new contestant(fields);

//     //handle file here
//     if (file.photo) {
//       if (file.photo.size > 3000000) {
//         return res.status(400).json({
//           error: "File size too big!"
//         });
//       }
//       // console.log(".///////////////////////////////////")
//       // console.log(file)
//       // console.log(".///////////////////////////////////")

//       new_contestant.photo.data = fs.readFileSync(file.photo.filepath);
//       new_contestant.photo.contentType = file.photo.type;
//     }
//     console.log(new_contestant);

//     //save to the DB
//     new_contestant.save((err, contestant) => {
//       if (err) {
//         res.status(400).json({
//           error: "Saving contestant in DB failed"
//         });
//       }
//       res.json(contestant);
//     });
//   });
// };



exports.increVotes=(req,res)=>{
  console.log(req.votecount);
    contestant.updateOne({_id:req.contestant._id},{$inc:{votes:+req.votecount}},(err,contestant)=>{
        if(err){
          console.log(err);
            return res.status(400).json({
                err:"count Not Updated"
            })
            }
            // console.log(contestant)
            res.json(contestant);
    })
}
