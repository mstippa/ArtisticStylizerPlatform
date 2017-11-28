


//things we need -- the test data and the homepage html template
var User = require('../model/user');
var Profile = require('../model/profile');
var multer = require('multer');
var mv = require('mv');


exports.post = function(req, res){
  // move the file from tmp/ to the user's profile directory
  console.log(req.body);
  // var picture = req; 
  // mv(req, 'profiles/'+Profile.profileid+'/pictures/', function(err) {
  //   if (err) throw err;
  //   else {
  //     console.log("content moved");
  //     // saveToDatabase(req);
  //   }  
 
  // // function saveToDatabase(req) {
  // //   Profile.savePicture()
  // // }   

  // });


};



