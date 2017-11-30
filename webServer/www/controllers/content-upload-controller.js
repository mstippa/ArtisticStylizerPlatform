// uploads content to tmp directory

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');

// store the image in tmp folder in the public directory
var storage = multer.diskStorage({
  destination: function(req, res, callback){
    callback(null, 'public/tmp/');
  },
  // keep the filename the same as the uploaded name
  filename: function(req, file, callback){
    callback(null, file.originalname);
  }
});

var upload = multer({storage: storage}).single('content');

exports.post = function(req, res){
  upload(req, res, function(err){
    if(err) throw err;
      // req.files is an ojbect where fieldname is the key and value is the array of files
      res.send("success");
    

  });

};



