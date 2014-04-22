var auth = require('./auth'),
  mongoose=require('mongoose'),
  users=require('../controllers/users');

module.exports=function(app){

  app.get('/api/users',auth.requiresRole('admin'),users.getUsers);
  app.post('/api/users', users.createUser);

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

