


//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
var mv = require('mv');


exports.post = function(req, res){

  req.on("data", function(data) {
    // turn the request into a string which is the path of the content image
    var contentPath = String(data);

    var userProfile;
    // get the user's profile
    Profile.getProfile(req.user.userid, function(err, result) {
      if (err) throw err;
      userProfile = result;
      console.log();
      if (userProfile.subscription === 2 || (userProfile.subscription === 1 && userProfile.pictures.length < 2)) {

        // move the file from /public/tmp to the user's profile directory 
        mv('./public/tmp/'+contentPath, './public/profiles/'+userProfile.profileid+'/pictures/'+contentPath, {mkdirp: true},  function(err) {
          if (err) throw err;

            
          //send picture to the database
          saveToDatabase(userProfile);  
        });
        
        // saves the picture to the database
        function saveToDatabase(userProfile) {

          // seeing if the user is trying to save the same photo
          if ('/profiles/'+userProfile.profileid+'/pictures/'+contentPath) {

            Profile.removePicture('/profiles/'+userProfile.profileid+'/pictures/'+contentPath, function(err, result) {
              if (err) throw err;

              Profile.savePicture(userProfile.profileid, '/profiles/'+userProfile.profileid+'/pictures/'+contentPath, null, null, null, null, null, function (err, result) {
                if (err) throw err;
                else {
                  res.send('/profiles/'+userProfile.profileid+'/pictures/'+contentPath);
                }

              });
            });        
          // the photo does not exist if here
          } else {

            Profile.savePicture(userProfile.profileid, '/profiles/'+userProfile.profileid+'/pictures/'+contentPath, null, null, null, null, null, function (err, result) {
              if (err) throw err;
              else {
                res.send('/profiles/'+userProfile.profileid+'/pictures/'+contentPath);
              }
            });
          }
        }
      // if here than user is a free user    
      } else {
        res.send("fail");
      } 
    });
      
  });
 // res.send("saved");
};