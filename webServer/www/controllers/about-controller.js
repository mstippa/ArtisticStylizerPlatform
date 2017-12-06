/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

var User = require('../model/user');

exports.get = function(req, res) {
	var userProfile;
	if (req.user) {

			User.isAdmin(req.user.userid, function(err, result) {
				if (err) throw err;
				renderPage( result);
			});

	} else {
		renderPage(false);
	}

	
	function renderPage(adminBoolean) {
		return res.render("../views/about.ejs", { user : req.user, admin: adminBoolean });
	}	

};
