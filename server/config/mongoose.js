var mongoose = require('mongoose'),
  userModel = require('../models/User')
  courseModel=require('../models/Course'),
  demPointModel=require('../models/DemPoint');

module.exports=function(config){

  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error',console.error.bind(console, 'connection error'))  ;
  db.once('open',function callback(){
    console.log('multivision2015 db opened');
  });

  userModel.createDefaultUsers();
  courseModel.createDefaultCourse();
  demPointModel.populateDemCollection();
}
