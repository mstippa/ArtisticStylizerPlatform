/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/
var User = require('../model/user');
var db = require('../db');
var Profile = require('../model/profile');


exports.get = function(req, res) {

	if (req.user === undefined) {
		var user = new User();
		return res.render("../views/home.ejs", { user: req.user});
	} else {
		console.log("dong");
		var userProfile;
		Profile.getProfile(req.user.userid, function(err, res) {
			if (err) throw err;
			userProfile = res;
			profileReturn();
		});

		function profileReturn() {
			res.render("../views/home.ejs" , {user: req.user, profile: userProfile});
		}
			
	}


	// var currentUser = req.user;

	// Profile.getProfile(currentUser.userid, function(err, res) {
	// 	if (err) throw err;
	// 	var userProfile = res;
	// 	return res.render("../views/home.ejs" ,{user: currentUser, profile: userProfile});
	// });
	

	
}
