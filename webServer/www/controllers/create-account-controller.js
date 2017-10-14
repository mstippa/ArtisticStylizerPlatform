/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

//things we need -- the test data and the homepage html template
var template = require('../views/view-create-account');



exports.get = function(request, response) {

	//put in the headers that we were successful
	response.writeHead(200, {
			'Content-Type':'text/html'
	});

	response.write(template.build(
		)
	);

	response.end();
};
