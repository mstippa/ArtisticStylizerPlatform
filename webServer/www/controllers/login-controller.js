/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var html = require('../views/view-login');



exports.get = function(req, res) {

	//put in the headers that we were successful
	// response.writeHead(200, {
	// 		'Content-Type':'text/html'
	// });

	// response.render("../views/login.ejs");
	return res.render("../views/login.ejs",  { 
		message : req.flash('loginMessage'), 
		user    : req.user
	});
};

exports.post = function(req, res){
	console.log(info);
	return res.render('../views/login.ejs', { message : req.flash('loginMessage') });
}

//this is for updating the page when they hit the login button
// exports.post = function(request, response){
// 	request.render()
// 	response.end();
// };
