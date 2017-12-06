


var User = require('../model/user');
var db = require('../db');
var Profile = require('../model/profile');


exports.get = function(req, res) {

	
	var userProfile;
	Profile.getProfile(req.user.userid, function(err, res) {
		if (err) throw err;
		userProfile = res;
		User.isAdmin(req.user.userid, function(err, result) {
			if (err) throw err;
			renderPage(result);
		});
	});

	function renderPage(adminBoolean) {
		res.render("../views/upgrade.ejs" , {user: req.user, profile: userProfile, admin: adminBoolean});

	}

	
}