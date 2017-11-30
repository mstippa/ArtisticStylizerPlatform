


//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
var mv = require('mv');


exports.post = function(req, res){

  req.on("data", function(data) {
    // turn the request into a string which is the path of the content image
    var contentPath = String(data);
    console.log(contentPath);
    var userProfile;
    // get the user's profile
    Profile.getProfile(req.user.userid, function(err, res) {
      if (err) throw err;
      userProfile = res;

      // move the file from /public/tmp to the user's profile directory 
      mv('/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/public/tmp/'+contentPath, '/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/public/profiles/'+userProfile.profileid+'/pictures/'+contentPath, function(err) {
        if (err) res.send("fail")
        else {
          saveToDatabase(userProfile);
          res.send("success");
        
        } 
      });

 
    function saveToDatabase(userProfile) {
      Profile.savePicture(userProfile.profileid, '/public/profiles/'+userProfile.profileid+'/pictures/'+contentPath, null, null, null, null, null, function (err, res)) {
        if (err) throw err;
        else
      }
    }   
    
    });

      res.send();

  });
  


};



