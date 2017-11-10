/**
	This is just a little demo of what we can do with node.js

	we first get the data we need (in this case wer're requiring
	'../model/test-data' but in the future we can get data from a database)

	after we get the data we brake it down into list items to be printed to the
	user.

**/

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var formidable = require('formidable');
var fs = require('fs');

exports.post = function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		var oldpath = files.filetoupload.path;
		var newpath = '/home/mike/' + files.filetoupload.name;
		fs.rename(oldpath, newpath, function(err){
			if (err) throw err;
			res.write('files uploaded and moved!');
			res.end();
		});
	});
}
