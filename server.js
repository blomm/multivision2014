//run this from the command line with nodemon - Monitor for any changes
// in your node.js application and automatically restart the server

var express = require('express'),
    stylus =require('stylus');

//create the environment variable - default is development if non has been set
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//create the express application
var app = express();

//set up stylus
function compile(str, path){
    return stylus(str).set('filename',path);
}

//create configuration for the express application
app.configure(function() {
    app.set('views', __dirname+'/server/views');
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
            src:__dirname+'/public',
            compile:compile
        }
    ));

    //create a route to the public directory.. essentially if any requests come via public, serve them up
    //this is static route handling
    app.use(express.static(__dirname+'/public'));
});

//any call that comes into the partials folder
app.get('/partials/:partialPath', function(request, result){
    result.render('partials/'+request.params.partialPath)
})

//default-catch-all route handling
app.get('*', function(request, result){
    //use the line below if we want to render raw html
    //result.render('index.html');
    result.render('index');
})

var port =3030;
app.listen(port)
console.log('listening on port '+port+'...');