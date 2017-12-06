// uploads a style 


// uploads content to tmp directory

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
var userProfile;

// store the image in tmp folder in the public directory
var storage = multer.diskStorage({
  destination: function(req, res, callback){
  	Profile.getProfile(req.user.userid, function(err, result) {
  		if (err) throw err;
  		userProfile = result;
  		callback(null, 'public/profiles/'+userProfile.profileid+'/styles');
  	})

  },
  // keep the filename the same as the uploaded name
  filename: function(req, file, callback){
    callback(null, file.originalname);
  }
});

var upload = multer({storage: storage}).single('style_content');

exports.post = function(req, res){
  upload(req, res, function(err){
    if(err) throw err;
      console.log(req.file);
      res.send(req.file.originalname + " " + userProfile.profileid);
    

  });

};











