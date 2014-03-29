var mongoose = require('mongoose');

module.exports=function(config){
  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error',console.error.bind(console, 'connection error'))  ;
  db.once('open',function callback(){
    console.log('multivision2014 db opened');
  });

  //1. create user schema
  var userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String
  })

  //2. create user model based on schema - mongoose will pluralize the collection in the db (users)
  var User = mongoose.model('User', userSchema);

  //3. create some users if none exist - if db doesn't exist, it will be created
  User.find({}).exec(function(err, collection){
    if(collection.length===0){
      User.create({firstName:'Joe',lastName:'Brown',userName:'brownj'});
      User.create({firstName:'Mike',lastName:'Blom',userName:'blomm'}) ;
      User.create({firstName:'Chris',lastName:'Smith',userName:'smithc'}) ;
    }
  })

}