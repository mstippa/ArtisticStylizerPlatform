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
		var userProfile;
		var styles;
		var adminBoolean;
		Profile.getProfile(req.user.userid, function(err, res) {
			if (err) throw err;
			userProfile = res;
			Profile.getDefaultStyles(function(err, res) {
				if (err) throw err;
				styles = res;
				User.isAdmin(req.user.userid, function(err, result) {
					if (err) throw err;
					adminBoolean = result;
					profileReturn(userProfile, styles, adminBoolean);
				});

			});
			
		});

		function profileReturn(userProfile, defaultStyles, adminBoolean) {
			res.render("../views/home.ejs" , {user: req.user, profile: userProfile, style: defaultStyles, admin: adminBoolean});
		}
			
	}


	// var currentUser = req.user;

	// Profile.getProfile(currentUser.userid, function(err, res) {
	// 	if (err) throw err;
	// 	var userProfile = res;
	// 	return res.render("../views/home.ejs" ,{user: currentUser, profile: userProfile});
	// });
	

	
}
