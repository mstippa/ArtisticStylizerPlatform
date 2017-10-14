//this is the port and ip information we will listen for
//should be set to the web server
var http_IP = '10.10.7.179';
var http_port = 8080;

//basic node.js module for http
var http = require('http');


//http.createServer() method turns computer into HTTP server

//http.createServer() method creates an HTTP Server object
//The HTTP Server object can listen to ports on the computer and execute a
//function, a requestListener, each time a request is made
var server = http.createServer(function(request, response){
	//this is the requestListener() function
	
	//requestListener is a function that is called each time the server gets a
	//request.
	
	//The requestListener function handles requests from the user, and also the
	//resonse back to the user.
	
	//here we are just passing the request and response to the router
	//the router directs the request to the correct controller
	require('./router').get(request,response);
});//end server()
server.listen(http_port,http_IP); //listen to the ip at the port specified above
console.log('listening to http://' + http_IP + ':' + http_port); //output to console
