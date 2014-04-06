var mongoose = require('mongoose'),
  crypto = require('crypto');

module.exports=function(config){

  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error',console.error.bind(console, 'connection error'))  ;
  db.once('open',function callback(){
    console.log('multivision2015 db opened');
  });

  //1. create user schema
  var userSchema =new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    salt:String,
    hashed_password:String,
    roles:[String]
  });

  userSchema.methods={
    authenticate:function(passwordToMatch) {
      return hashPwd(this.salt,passwordToMatch)===this.hashed_password;
    }
  }


  //2. create user model based on schema - mongoose will pluralize the collection in the db (users)
  var User = mongoose.model('users', userSchema);

  //3. create some users if none exist - if db doesn't exist, it will be created
  User.find({}).exec(function(err, collection){
    console.log("collections length: "+collection.length);
    if(collection.length===0){
      var salt, hash;
      salt=createSalt();
      hash=hashPwd(salt,'brownj');
      User.create({firstName:'Joe',lastName:'Brown',userName:'brownj', salt:salt,hashed_password:hash, roles: ['admin']});
      salt=createSalt();
      hash=hashPwd(salt,'blomm');
      User.create({firstName:'Mike',lastName:'Blom',userName:'blomm', salt:salt,hashed_password:hash,roles:[]}) ;
      salt=createSalt();
      hash=hashPwd(salt,'smithc');
      User.create({firstName:'Chris',lastName:'Smith',userName:'smithc', salt:salt,hashed_password:hash});
    }
  })

}

function createSalt(){
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd){
  var hmac=crypto.createHmac('sha1',salt);
  return hmac.update(pwd).digest('hex');
}