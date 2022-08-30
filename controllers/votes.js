const User = require("../models/user");
const Contestant = require("../models/contestant");

exports.decrementVotes=(req,res)=>{
    User.updateOne({_id:req.profile._id},{$inc:{votelimit:-10}})
    .exec((err,user)=>{
        if (err || !user) {
            return res.status(400).json({
              error: "decrement of votes not worked"
            });
          }
          res.end();
    })
}

exports.updateVotesOfAllUsers=(req,res)=>{
    User.updateMany({},{$set:{votelimit:10}}).exec((err,upda)=>{
        if (err) {
            return res.status(400).json({
              error: "decrement of votes not worked"
            });
          }
          res.end();
        
    })
}

exports.sendNameWithPercentages=(req,res)=>{
  Contestant.find().exec((err,contestan)=>{
    if(err){
      return res.status(400).json({
        error:"Unable to Fetch your req at this Time"
      })
    }
    var total_votes=0;
        var Percentagesarr=[]
         contestan.map((conte,index)=>{
           total_votes+=conte.votes;
         })
         contestan.map((conte,index)=>{
          var tmp_contestant_per=((conte.votes)/total_votes)*100;
          var obj1={
            name:conte.name,
            percentage:tmp_contestant_per
          }
          Percentagesarr.push(obj1);
        })
        var res1 = Percentagesarr.sort(({percentage:a}, {percentage:b}) => b-a);
        var names=[]
        var percentages=[]
        res1.map((obj1,index)=>{
            names.push(obj1.name)
            percentages.push(obj1.percentage)
        })
        res.send({names,percentages})
  })
}

exports.loadUserVotes=(req,res)=>{
  User.find({_id:req.profile._id}).exec((err,data)=>{
    if(err){
      return res.status(400).json({
        error: "load user votes not working"
      });
    }
    var remaining_votes=data[0].votelimit;
    return res.json({remaining_votes})
  })
}

exports.makeVotesZero=(req,res)=>{
  User.updateMany({},{$set:{votelimit:0}}).exec((err,upda)=>{
    if (err) {
        return res.status(400).json({
          error: "decrement of votes not worked"
        });
      }
      res.end();
    
})
}
