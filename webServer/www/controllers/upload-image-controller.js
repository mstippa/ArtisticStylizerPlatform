

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
var upload = multer({dest: 'tmp/'})
var PythonShell = require('python-shell');


var storage = multer.diskStorage({
	destination: function(req, res, callback){
		callback(null, 'tmp/');
	},

	filename: function(req, file, callback){
		callback(null, file.originalname)
	}
});

var upload = multer({storage: storage}).array('photo', 2);

exports.post = function(req, res){
	upload(req, res, function(err){
		if(err){
			console.log('error occured');
			return;
		}
		// req.files is an ojbect where fieldname is the key and value is the array of files
		console.log(req.files[0]);
		console.log('photo uploaded');
		var options = {
			pythonPath: '/usr/bin/python3',
		        scriptPath: '/home/mike/repos/cmpt475_Nov28/ArtisticStylizerPlatform/gpuServer/AS/src/',
		        args: [req.files[0].path, req.files[1].path, '/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/tmp', 256, 512]
		};
		try{
			PythonShell.run('inference_master.py', options, function(err){
		        if (err) throw err;
			});
		}
		catch(err){
			console.log(err);
		}
	});

};