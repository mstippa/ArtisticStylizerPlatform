/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var html = require('../views/view-home');



exports.get = function(request, response, info) {

	//put in the headers that we were successful
	// response.writeHead(200, {
	// 		'Content-Type':'text/html'
	// });

	// response.render("../views/login.ejs");
	return response.render("../views/login.ejs", {message: info});
};

exports.post = function(request, response, info){
	console.log(info);
	return response.render('../views/login.ejs', {message:info});
}

//this is for updating the page when they hit the login button
// exports.post = function(request, response){
// 	request.render()
// 	response.end();
// };
