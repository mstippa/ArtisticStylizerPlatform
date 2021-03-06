/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

exports.get = function(req, res) {

	//put in the headers that we were successful
	// response.writeHead(200, {
	// 		'Content-Type':'text/html'
	// });

	return res.render("../views/create-account.ejs", { message : req.flash('signupMessage'),user : req.user, admin: false });

};

exports.post = function(req, res){
	
	return res.render("../views/create-account.ejs", { message: req.flash('signupMessage') });
}
