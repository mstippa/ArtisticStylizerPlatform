
//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
// var upload = multer({dest: 'tmp/'});
var PythonShell = require('python-shell');


var storage = multer.diskStorage({
	destination: function(req, res, callback){
		callback(null, 'profiles/'+Profile.profileid+'/styles/');
	},

	filename: function(req, file, callback){
		console.log(file);
		callback(null, file.originalname)
	}
});

var upload = multer({storage: storage}).single('style');


// var currentUser = req.user;

	// Profile.getProfile(currentUser.userid, function(err, res) {
	// 	if (err) throw err;
	// 	var userProfile = res;
	// 	return res.render("../views/home.ejs" ,{user: currentUser, profile: userProfile});
	// });


exports.post = function(req, res){
	upload(req, res, function(err){
		if(err){
			console.log('error occured');
			return;
		}
		// req.files is an ojbect where fieldname is the key and value is the array of files
		console.log('photo uploaded');
		var options = {
			pythonPath: '/usr/bin/python3',
		    scriptPath: '/home/mike/ArtisticStylizerPlatform/gpuServer/AS/src',
		    args: [req[0], req[1], '/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/tmp', 256, 512]
		};
		try{
			PythonShell.run('inference_master.py', options, function(err){
				if (err) throw err;
				
				// load the user first
				// var currentUser = req.user;
				// console.log("current user: ", currentUser);

				// Profile.getProfile(currentUser.userid, function(err, result) {
				// 	if (err) throw err
					
				// 	var userProfile = result;
					
				// 	return res.render("../views/home.ejs", { user : req.user });
				// })
			});
		}
		catch(err){
			console.log(err);
		}
	});

};



