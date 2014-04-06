var auth = require('./auth'),
  mongoose=require('mongoose'),
  User=mongoose.model('users');

module.exports=function(app){

  app.get('/api/users',auth.requiresRole('admin'),function(req,res){
    User.find({}).exec(function(err,collection){
      res.send(collection)
    })
  });

  app.get('/partials/*', function(request, result){
    result.render('../../public/app/'+request.params)
  })

  app.post('/logout',function(req,res){
    req.logout();
    res.send();
  })

  app.post('/login',auth.authenticate)

  //default-catch-all route handling
  app.get('*', function(req, res){
    res.render('index',{bootstrappedUser:req.user});
  })

}

