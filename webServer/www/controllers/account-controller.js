/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

var Profile = require('../model/profile');
var User = require('../model/user');

exports.get = function(req, res) {
	var userProfile;
	Profile.getProfile(req.user.userid, function(err, result) {
		userProfile = result;
		User.isAdmin(req.user.userid, function(err, result) {
			renderPage(userProfile, result);
		})
	});

	function renderPage(userProfile, adminBoolean) {	
		return res.render("../views/account.ejs", { user : req.user, userProfile: Profile, admin: adminBoolean });
	}	
};

// exports.post = function(req, res) {

// 	req.on("data", function(data) {
// 	    // turn the request into a string which is the path of the content image

// 	    var pictureId = String(data);

// 	    var userProfile;
// 	    var pictureProfileId;
// 	    var userpictures;
// 		    Profile.getProfile(req.user.userid, function(err, result) {
// 		      if (err) throw err;
// 		      console.log(result);
// 		      userProfile = result;
// 		      Profile.getProfileFromPic(pictureid, function(err, result) {
// 		        if (err) throw err;
// 		        pictureProfileId = result;
// 		        Profile.getPictures(pictureProfileId, function(err, result) {
// 		        	if (err) throw err;
// 		        	userpictures = result;
// 		        	renderPage()
// 		        });

// 		      });  

// 		    });

// 	};

// 	function renderPage() {
// 		return res.render("../views/account.ejs", { user : req.user, userProfile: Profile, admin: adminBoolean, pictures: userpcitures });
// 	}   

// }
