var DemPoint=require('mongoose').model('DemPoint');

exports.getDemPoints=function(req, res){
  DemPoint.find({}).exec(function(err,collection){
    res.send(collection);
  })
}