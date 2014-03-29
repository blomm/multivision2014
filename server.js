//run this from the command line with nodemon - Monitor for any changes
// in your node.js application and automatically restart the server

var express = require('express'),
    mongoose =require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//create the environment variable - default is development if non has been set
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//create the express application
var app = express();
console.log("Environment: "+env);
var config=require('./server/config/config')[env];
console.log("db: "+config.db);
console.log("root path: "+config.rootPath);
console.log("port: "+config.port);

//requiring this will invoke the function
require('./server/config/express')(app,config);

require('./server/config/mongoose')(config);

//get the mongoose user model
var User = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done){
    User.find({}).exec(function(err,coll){
      if(coll){
        return done(null,coll[0]);
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
    if(user){
      return done(null, user);
    }
    else{
      return done(null, false);
    }
  })
})

require('./server/config/routes')(app);

app.listen(config.port)
console.log('listening on port '+config.port+'...');