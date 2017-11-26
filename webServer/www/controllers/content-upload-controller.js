/**
  This is just a little demo of what we can do with node.js

  we first get the data we need (in this case wer're requiring
  '../model/test-data' but in the future we can get data from a database)

  after we get the data we brake it down into list items to be printed to the
  user.

**/

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');



var storage = multer.diskStorage({
  destination: function(req, res, callback){
    callback(null, 'tmp/');
  },

  filename: function(req, file, callback){
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).single('content');

exports.post = function(req, res){
  upload(req, res, function(err){
    if(err) throw err;
    else {
      // req.files is an ojbect where fieldname is the key and value is the array of files
      console.log('i like poop');

  
    }

  });

};



