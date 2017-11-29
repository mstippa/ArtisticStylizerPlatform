//server.js

/*******************************************
*					SET UP
*******************************************/
var express = require('express');
var path    = require('path');
var app     = express();

app.set('view engine', 'ejs'); //set the view engine to ejs

//serve our static files (css, js, ect) here
var options = {
	dotfile: 'ignore',
	etag: false,
	extensions: ['css', 'js', 'png', 'jpg'],
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders: function(res, path, stat){
		res.set('x-timestamp', Date.now());
	}
}

app.use(express.static('public', options));

/**************************************************************
*						Server information
***************************************************************/
var http_IP = '10.10.7.179';

var http_port = 8084;

/**************************************************************
*					Passport authentication
*						AND
*					Session data
***************************************************************/
var passport     = require('passport');
var session 	 = require('express-session');
var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

// Passport does not directly manage your session, it only uses the session.
// So you configure session attributes (e.g. life of your session) via express
var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  secret: 'asp',
  cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}


app.use(cookieParser('aspawesomeness')); // read cookies (needed for auth)
app.use(bodyParser()); //get information from html forms

app.use(session(sessionOpts)); //tell our app to use sessions initalized with our sessionOpts

app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash());

require('./config/passport')(passport); // pass passport for configuration


/**********************************************************
*						Router
**********************************************************/

//first we'll make some middleware to get rid of capital extensions
app.use(function(req, res, next){
	req.url = req.url.toLowerCase();
	next();
})

//send all other routes here
var router = require('./router');
app.use(router); 

/**************************************************************
*						error handling middleware
**************************************************************/
app.use(function(err, req, res, next){
	console.error(err.stack);
	next(err);
})

/**************************************************************
*						Database
***************************************************************/
var mysql = require('mysql');
var async = require('async');
// app.use(async()); // async database

//init the db 
var db = require('./db');

//connect to the database then listen for requests
db.connect(db.MODE_PRODUCTION, function(err){
	if(err) {
		//error case, cannot connect to sql database

		console.log('Unable to connect to mysql'); //log the error

		//exit the program gracefully
		process.exit(1);
	} else { 
		
		/****************************************************************************
		*			Tell the app to listen to the speicfied port and ip
		****************************************************************************/
		app.listen(http_port,http_IP); 

		//output to console
		console.log('listening to http://' + http_IP + ':' + http_port); 

	}
});
