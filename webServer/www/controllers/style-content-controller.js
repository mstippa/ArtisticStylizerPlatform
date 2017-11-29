

var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
// var upload = multer({dest: 'tmp/'});
var PythonShell = require('python-shell');


exports.post = function(req, res){

	req.on("data", function(data) {
	    // turn the request into a string which is the path of the content image
	    var contentPath = String(data);
	    console.log(contentPath);
	    var userProfile;
	    Profile.getProfile(req.user.userid, function(err, res) {
	      if (err) throw err;
	      userProfile = res;

	      // move the file from tmp/ to the user's profile directory
	      mv(contentPath, '../profiles/'+userProfile.profileid+'/pictures/'+contentPath, function(err) {
	        if (err) throw err;
	        else {
	          console.log("content moved");
	          // saveToDatabase(req);
	        } 
	      });

	 
	    // function saveToDatabase(req) {
	    //   Profile.savePicture()
	    // }   
	    
	    });
	    
	      res.send();

	  });


	var options = {
		pythonPath: '/usr/bin/python3',
	    scriptPath: '/home/mike/repos/cmpt475_Nov28/ArtisticStylizerPlatform/gpuServer/AS/src/',
	    args: [req[0], req[1], '/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/public/tmp', 256, 512]
	};    
	PythonShell.run('inference_master.py', options, function(err){
		if (err) throw err;
		else {
			console.log("success");
		}	
			

	});





};





