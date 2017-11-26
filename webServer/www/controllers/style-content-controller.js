

var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
// var upload = multer({dest: 'tmp/'});
var PythonShell = require('python-shell');


exports.post = function(req, res){

	var options = {
		pythonPath: '/usr/bin/python3',
	    scriptPath: '/home/mike/ArtisticStylizerPlatform/gpuServer/AS/src',
	    args: [req[0], req[1], '/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/tmp', 256, 512]
	};    
	PythonShell.run('inference_master.py', options, function(err){
		if (err) throw err;
		else {
			console.log("success");
		}	
			

	});


};





