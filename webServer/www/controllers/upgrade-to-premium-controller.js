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


exports.post = function(req, res) {


	var userProfile;
	var styles;
	Profile.getProfile(req.user.userid, function(err, result) {
		if (err) throw err;
		userProfile = result;
		Profile.upgradeToPremium(req.user.userid, function(err, result) {
			if (err) throw err;
			Profile.getDefaultStyles(function(err, result) {
				if (err) throw err;
				var styles = result;
				renderPage(userProfile, styles);
			});
		});
		
	});

	function renderPage(userProfile, defaultStyles) {
		console.log('penisbutttttttt');
		res.send();
	}
			


	// var currentUser = req.user;

	// Profile.getProfile(currentUser.userid, function(err, res) {
	// 	if (err) throw err;
	// 	var userProfile = res;
	// 	return res.render("../views/home.ejs" ,{user: currentUser, profile: userProfile});
	// });
	

	
}
