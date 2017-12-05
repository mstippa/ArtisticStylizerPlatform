/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

exports.get = function(req, res) {
	var adminBoolean;
	if (req.user) {
		User.isAdmin(req.user.userid, function(err, result) {
			if (err) throw err;
			adminBoolean = result;
			console.log(adminBoolean);
			renderPage();
		});
	} else {
		adminBoolean = false;
		renderPage();
	}

	
	function renderPage(adminBoolean) {
		return res.render("../views/about.ejs", { user : req.user, admin: adminBoolean });
	}	

};
