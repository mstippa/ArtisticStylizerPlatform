


var User = require('../model/user');
var db = require('../db');
var Profile = require('../model/profile');


exports.get = function(req, res) {

	
	var userProfile;
	Profile.getProfile(req.user.userid, function(err, res) {
		if (err) throw err;
		userProfile = res;
		renderPage();

	});

	function renderPage() {
		res.render("../views/upgrade.ejs" , {user: req.user, profile: userProfile});

	}

	
}