var express = require('express'),
  stylus = require('stylus'),
  passport=require('passport');

module.exports=function(app, config){
  //set up stylus
  function compile(str, path){
    return stylus(str).set('filename',path);
  }

  //create configuration for the express application
  app.configure(function() {
    app.set('views', config.rootPath+'/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({secret: 'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());

    //configure the stylus middle ware
    app.use(stylus.middleware(
      {
        src:config.rootPath+'/public',
        compile:compile
      }
    ));

    //create a route to the public directory.. essentially if any requests come via public, serve them up
    //this is static route handling
    app.use(express.static(config.rootPath+'/public'));
  });
}
