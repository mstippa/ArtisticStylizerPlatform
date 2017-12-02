// uploads content to tmp directory

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');



exports.post = function(req, res){


  req.on("data", function(data) {
    // turn the request into a string which is the path of the content image
    var pictureid = String(data);
    var userProfile;

    Profile.getProfile(req.user.userid, function(err, result) {
      if (err) throw err;
      userProfile = result;
      Profile.reportPicture(userProfile.profileid, pictureid, null, req.files[0], function(err, result) {
        if (err) throw err;


      });  

    });

    res.send();


  });  
   
  


};

