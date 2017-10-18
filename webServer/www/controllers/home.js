/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/
var User = require('../model/user');
var template = require('../views/view-home');
var db = require('../db');


exports.get = function(request, response) {


	//TESTING USER OBJECT TO READ DATABASE
	var user = new User();
	user.getUser(1, function(err, newUser){
		if(err) throw err;

		//NO ERROR SO LETS DO SOMETHING WITH OUR USER WE FOUND
		user = newUser;
		console.log(user);
	});

	//put in the headers that we were successful
	response.writeHead(200, {
			'Content-Type':'text/html'
	});

	//write the response with the 3 input parameters title, pagetitle, content
	response.write(template.build(
		"Test web page on node.js",
		"user emails",
		"<p>The emails of ASP's Premium Users are:</p>")
	);
	response.end();
}
