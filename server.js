//run this from the command line with nodemon - Monitor for any changes
// in your node.js application and automatically restart the server

var express = require('express'),
    stylus =require('stylus'),
    mongoose =require('mongoose');

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

//multivision is the db that will be created
if(env==='development')   {
    mongoose.connect('mongodb://localhost/multivision');
}else{
    mongoose.connect('mongodb://blomm:multivision@ds033307.mongolab.com:33307/multivision');
}

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'))  ;
db.once('open',function callback(){
    console.log('multivision db opened');
});

/*var messageSchema = mongoose.Schema({message:String});
//create the model to hold the message based on the above schema
//mongoose will look in the db for messages (pluralised) unless we
//add the third parameter which is the name of the collection in the db
var Message=mongoose.model('message',messageSchema);
var mongoMessage;
Message.findOne().exec(function(err,messageDoc){
    //console.log(messageDoc);
    //console.log(err);
    mongoMessage=messageDoc.message;
})*/

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

var port =process.env.PORT||3030;
app.listen(port)
console.log('listening on port '+port+'...');