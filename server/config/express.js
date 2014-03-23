var express = require('express'),
  stylus = require('stylus')

module.exports=function(app, config){
  //set up stylus
  function compile(str, path){
    return stylus(str).set('filename',path);
  }

  //create configuration for the express application
  app.configure(function() {
    app.set('views', config.rootPath+'/server/views');
    app.set('view engine', 'jade');
    //use the line below if we want to render raw html
    //http://stackoverflow.com/questions/4529586/render-basic-html-view-in-node-js-express
    //app.engine('html', require('ejs').renderFile);
    app.use(express.logger('dev'));
    //will parse the body of any documents sent back to the server
    app.use(express.bodyParser());

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
