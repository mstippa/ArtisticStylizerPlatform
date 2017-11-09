exports.get = function(req, res) {

	return res.render("../views/upgrade.ejs", { user : req.user });

};