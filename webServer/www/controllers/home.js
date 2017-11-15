/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/
var User = require('../model/user');
var db = require('../db');


exports.get = function(req, res) {


	var user = new User();
	

	return res.render("../views/home.ejs", { user : req.user });
	
}
