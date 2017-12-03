/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/
var sessionUser = require('../model/user.js');
var Profile = require('../model/profile.js');

 exports.get = function(req, res) {
 	sessionUser = req.user;

 	Profile.getProfile(sessionUser.userid, function(err, result){
 		if(err) throw err;

 		var userProfile = result;


 		Profile.getProfilePicture(userProfile.profileid, 
 			function(err, result) { 
 				if (err) throw err;
 				var profilePic = '/images/pip.png';
 				console.log("result", result.profile_pic_path);
 				if(result != null)
 					profilePic = result.profile_pic_path;
 				
 				return res.render("../views/profile.ejs", { user : sessionUser , picture: profilePic })
 		});
 	});
}

