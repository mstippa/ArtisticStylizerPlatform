/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

var Profile = require('../model/profile');

exports.get = function(req, res) {

	var userProfiles;
	Profile.getAllProfiles(function(err, result) {
		console.log(result);
		if (err) throw err;
		userProfiles = result;
		displayPage(userProfiles);
	})

	function displayPage(userProfiles) {
		return res.render("../views/explore.ejs", { user : req.user, profiles: userProfiles });
	}	
};



