

exports.get = function(req, res) {

	return res.render("../views/about.ejs", { user : req.user });

};
