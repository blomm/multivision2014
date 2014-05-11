var auth = require('./auth'),
  mongoose=require('mongoose'),
  users=require('../controllers/users'),
  courses=require('../controllers/courses'),
  demPoints=require('../controllers/demPoints');

module.exports=function(app){

  app.get('/api/users',auth.requiresRole('admin'),users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users',users.updateUser);

  app.get('/api/courses', courses.getCourses);
  //app.post('/api/courses');

  app.get('/api/dempoints', demPoints.getDemPoints);

  app.get('/partials/*', function(request, result){
    result.render('../../public/app/'+request.params)
  })

  app.post('/logout',function(req,res){
    req.logout();
    res.send();
  })

  app.post('/login',auth.authenticate)

  app.all('/api/*',function(req,res){
    res.send(404);
  })

  //default-catch-all route handling
  app.get('*', function(req, res){
    res.render('index',{bootstrappedUser:req.user});
  })

}

