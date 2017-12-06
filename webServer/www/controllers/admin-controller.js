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

	User.isAdmin(req.user.userid, function(err, result) {
		if (err) throw err;
		var adminBoolean = result;
		if (adminBoolean) {
			Profile.getReports(function(err, result) {
				if (err) throw err;
				var reports = result;
				
				renderPage(reports);
			})
		}

	});
	

		function renderPage(result) {
			return res.render("../views/admin.ejs", { user : req.user, reports: result });
		}	
	
	
};
