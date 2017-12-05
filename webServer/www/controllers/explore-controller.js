/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

var Profile = require('../model/profile');

exports.get = function(req, res) {

	var allPictures;
	var userProfile;
	Profile.getAllPictures(function(err, result) {
		if (err) throw err;
		allPictures = result;
		Profile.getProfile(req.user.userid, function(err, result) {
			userProfile = result;
			displayPage(allPictures, userProfile)
		});

	});

	function displayPage(allPictures, userProfile) {
		return res.render("../views/explore.ejs", { user : req.user, pictures: allPictures, profile: userProfile });
	}	
};



