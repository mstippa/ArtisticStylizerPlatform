// uploads content to tmp directory

//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');



exports.post = function(req, res){


  req.on("data", function(data) {
    // turn the request into a string which is the path of the content image
    var dataString = String(data);
    var pictureid = dataString.substr(0, dataString.indexOf(" "));
    var reportcontent = dataString.substr(dataString.indexOf(" ") + 1, dataString.length-1);

    Profile.getProfile(req.user.userid, function(err, result) {
      if (err) throw err;
      console.log(result);
      userProfile = result;
      Profile.reportPicture(userProfile.profileid, pictureid, null, reportcontent, function(err, result) {
        if (err) throw err;
        response();

      });  

    });
    function response() {
      res.send("success");
    }  


  });  
   
  


};

