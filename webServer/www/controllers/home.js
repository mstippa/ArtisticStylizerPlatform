/**
	This is just a little demo of what we can do with node.js
	
	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)
	
	after we get the data we brake it down into list items to be printed to the
	user.

**/

//things we need -- the test data and the homepage html template
var template = require('../views/template-main');
var test_data = require('../model/test-data');

exports.get = function(request, response) {
	
	//get each profile and output the email address
	var profiles = test_data.profiles;
	var email = "";
		i = 0;
	for(i = 0 ; i < profiles.count; ){
		email = email + "<li>" + profiles.profiles[i].email + "</li>";
		i = i+1;
	}
	email = "<ul> " + email + "</ul>"; 
	
	//put in the headers that we were successful 
	response.writeHead(200, {
			'Content-Type':'text/html'
	});
	
	//write the response with the 3 input parameters title, pagetitle, content
	response.write(template.build(
		"Test web page on node.js", 
		"" + profiles.subscriptionStatus + " user emails",
		"<p>The emails of ASP's Premium Users are:</p>" + email)
	);
	response.end();
};