

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
		   	args: ['public/tmp/'+content, 'public/default_styles/'+style, '/home/morgan/Party_Time/ArtisticStylizerPlatform/webServer/www/public/tmp', 256, 512]
		};
        try{
                PythonShell.run('./scripts/addToQueue.py', options, function(err){
                	if (err) throw err;
                	display()
                });
        }
        catch(err){
                console.log(err);
        }
	function display() {
		res.send();
	}

	});


};


// var upload = multer({storage: storage}).array('photo', 2);

// exports.post = function(req, res){
//         upload(req, res, function(err){
//                 if(err){
//                         console.log('error occured');
//                         return;
//                 }
//                 // req.files is an ojbect where fieldname is the key and value is the array of files
//                 console.log(req.files);
// 		console.log('photo uploaded');
//                 var options = {
//                         pythonPath: '/usr/bin/python3',
//                        // scriptPath: '/home/mike/test/ArtisticStylizerPlatform/webServer/www/scripts',
//                         args: [req.files[0].path, req.files[1].path, '/home/morgan/Party_Time/ArtisticStylizerPlatform/webServer/www/public/tmp', 256, 512]
//                 };
//                 try{
//                         PythonShell.run('./scripts/addToQueue.py', options, function(err){
//                         if (err) throw err;
//                         });
//                 }
//                 catch(err){
//                         console.log(err);
//                 }
//         });
// };






