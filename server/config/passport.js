var passport=require('passport'),
  mongoose=require('mongoose'),
  LocalStrategy=require('passport-local').Strategy,
  User = mongoose.model('users');

module.exports=function(){

  passport.use(new LocalStrategy(
    function(username, password, done){

      User.findOne({userName:username}).exec(function(err,user){
        if(user && user.authenticate(password)){
          return done(null,user);
        }else{
          return done(null, false);
        }
      })
    }
  ));

  //call passport.serializeUser
  passport.serializeUser(function(user,done){

    if(user){
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id,done){

    User.findOne({_id:id}).exec(function(err,user){

      if(user ){
        return done(null, user);
      }
      else{
        return done(null, false);
      }
    })
  })

}