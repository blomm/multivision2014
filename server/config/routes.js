module.exports=function(app){
  //any call that comes into the partials folder
  app.get('/partials/*', function(request, result){
    result.render('../../public/app/'+request.params)
  })

  //default-catch-all route handling
  app.get('*', function(request, result){
    //use the line below if we want to render raw html
    //result.render('index.html');
    /*result.render('index',{
     mongoMessage:mongoMessage
     });*/
    result.render('index');

  })

}

