var passport = require('passport');

module.exports=function(app){
  //any call that comes into the partials folder
  app.get('/partials/*', function(request, result){
    result.render('../../public/app/'+request.params)
  })

  app.post('/login',function(req,res,next){
    var auth=passport.authenticate('local',function(err,user){
      if(err){return next(err);}
      if(!user){res.send({success:false})}
      req.logIn(user, function(err){
        if(err) {return next(err);}
        res.send({success:true, user:user});
      })
    })
    auth(req,res,next);
  })

  //default-catch-all route handling
  app.get('*', function(request, result){
    result.render('index');
  })

}

