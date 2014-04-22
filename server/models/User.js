var mongoose=require('mongoose'),
  encryption=require('../utilities/encryption');

//1. create user schema
var userSchema =new mongoose.Schema({
  firstName:{type:String, required:'{PATH} is required'},
  lastName:{type:String, required:'{PATH} is required'},
  userName:{
    type:String,
    required:'{PATH} is required',
    unique:true
  },
  salt:{type:String, required:'{PATH} is required'},
  hashed_password:{type:String, required:'{PATH} is required'},
  roles:[String]
//  firstName:String,
//  lastName:String,
//  userName:String,
//  salt:String,
//  hashed_password:String,
//  roles:[String]
});

userSchema.methods={
  authenticate:function(passwordToMatch) {
    return encryption.hashPwd(this.salt,passwordToMatch)===this.hashed_password;
  }
}

//2. create user model based on schema - mongoose will pluralize the collection in the db (users)
var User = mongoose.model('users', userSchema);

function createDefaultUsers(){
  //3. create some users if none exist - if db doesn't exist, it will be created
  User.find({}).exec(function(err, collection){
    console.log("collections length: "+collection.length);
    if(collection.length===0){
      var salt, hash;
      salt=encryption.createSalt();
      hash=encryption.hashPwd(salt,'brownj');
      User.create({firstName:'Joe',lastName:'Brown',userName:'brownj', salt:salt,hashed_password:hash, roles: ['admin']});
      salt=encryption.createSalt();
      hash=encryption.hashPwd(salt,'blomm');
      User.create({firstName:'Mike',lastName:'Blom',userName:'blomm', salt:salt,hashed_password:hash,roles:[]}) ;
      salt=encryption.createSalt();
      hash=encryption.hashPwd(salt,'smithc');
      User.create({firstName:'Chris',lastName:'Smith',userName:'smithc', salt:salt,hashed_password:hash});
    }
  })

};

exports.createDefaultUsers=createDefaultUsers;
