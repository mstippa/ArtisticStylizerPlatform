

var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
// var upload = multer({dest: 'tmp/'});
var PythonShell = require('python-shell');


exports.post = function(req, res){

	req.on("data", function(data) {
	    // turn the request into a string which is the path of the content image

	    var dataString = String(data);
		var content = dataString.substr(0, dataString.indexOf(" "));
		var style = dataString.substr(dataString.indexOf(" ") + 1, dataString.length-1);

	    console.log(content);
	    console.log(style);
	    
	    var options = {
			pythonPath: '/usr/bin/python3',
		    scriptPath: '/home/mike/repos/cmpt475_Nov28/ArtisticStylizerPlatform/gpuServer/AS/src/',
		    args: ['/public/tmp/'+content, '/public/default_styles/'+style, '/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/public/tmp', 256, 512]
		}; 

		PythonShell.run('inference_master.py', options, function(err){
			if (err) throw err;
			else {
				console.log("success");
				res.send();
			}	
				

		});


	});


};





