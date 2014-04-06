//run this from the command line with nodemon - Monitor for any changes
// in your node.js application and automatically restart the server

var express = require('express');

//create the environment variable - default is development if non has been set
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//create the express application
var app = express();
var config=require('./server/config/config')[env];

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

app.listen(config.port)
console.log('listening on port '+config.port+'...');