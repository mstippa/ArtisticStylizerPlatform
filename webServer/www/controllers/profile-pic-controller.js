// uploads content to tmp directory

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');

// store the image in tmp folder in the public directory
var storage = multer.diskStorage({
  destination: function(req, res, callback){
    callback(null, 'public/profiles/'+ userProfile.profileid + "/");
  },
  // keep the filename the same as the uploaded name
  filename: function(req, file, callback){
    callback(null, file.originalname);
  }
});

var upload = multer({storage: storage}).single('profilepic');

exports.post = function(req, res){

  Profile.getProfile(req.user.userid, function(err, result) {
    if (err) throw err;
    var userProfile = result;

    upload(req, res, function(err){
      if(err) throw err;
      else {

        Profile.changeProfilePic(userProfile, req.files[0].path, function(err, results)) {
          if (err) throw err;
          res.send(userProfile.profileid);
        });

      }
              

    });

  });

};



