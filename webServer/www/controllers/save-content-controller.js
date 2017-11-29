


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
    Profile.getProfile(req.user.userid, function(err, res) {
      if (err) throw err;
      userProfile = res;

      // move the file from tmp/ to the user's profile directory
      mv('/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/public/tmp/'+contentPath, '/home/morgan/MorgansParty/ArtisticStylizerPlatform/webServer/www/profiles/'+userProfile.profileid+'/pictures/'+contentPath, function(err) {
        if (err) throw err;
        else {
          console.log("content moved");
          // saveToDatabase(req);
        } 
      });

 
    // function saveToDatabase(req) {
    //   Profile.savePicture()
    // }   
    
    });

      res.send();

  });
  


};



