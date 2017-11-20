/*******************
* profile.js
*******************/
var db      = require('../db.js');
var Picture = require('./picture.js');
var Video   = require('./video.js');
var Style   = require('./style.js');
var async   = require('async');
var fs      = require('fs'); // for writing to the file system

// default path for all profiles
var PATH    = './profiles/'

// constructor
function Profile(userId, profileId){
	this.userid        = 	userId;
	this.profileid     = 	profileId;
	this.styles		   = 	null;
	this.pictures      =    null;
	this.videoes	   =	null;
	this.transactions  =    null;
	this.payments      =    null;
	this.subscription  =    null;
	this.usages        =    null;
}


// get the profile related to the user with the given user id
// return a constructed instance of the profile to the callback
Profile.getProfile = function(userId, done){
	db.get(db.READ, function(err,connection) {
		if (err) return done(err);

		// get the profile with the given userid
		connection.query('SELECT * FROM profiles WHERE user_id = ?',
				[userId],
				function(err, result){
					if (err) return done (err);

					// make sure there is a profile found first
					if (result.length == 0) return("no profile for that user", null);
					
					// we'll be returning this profile object later
					profile = new Profile(result[0].user_id, result[0].profile_id);
					
					// get the array of style objects, which is our first async call
					Profile.getStyles(profile.profileid, function(err, styles){
						if (err) return done(err);

						profile.styles = styles; // move the styles to this profiles styles array
						
						// now we make our second async call to get our video array
						// since we're in the callback of our first async call,
						// this will only execute after the first async call is complete
						Profile.getVideos(profile.profileid,function(err, videos){
							if (err) return done(err);

							profile.videoes = videos; // move the videos to this profiles videos array
							
							// now we make our final async call for our picture array
							// this is only executed after the first and second async call is completed
							Profile.getPictures(profile.profileid,function(err, pictures){
								if (err) return done(err);
								
								profile.pictures = pictures; // move the pictures to our picture array

								// return the completed profile to the callback
								return done(null, profile);
							});
						});
					});
			    }
		)
	});
}


// create a new profile related to a user by the userid
Profile.createProfile = function(userId, done){
	db.get(db.WRITE, function(err, connection){
		if(err) return done(err);

		//insert a new profile with just the userid as a field
		connection.query('INSERT INTO profiles(user_id) VALUES (?)',
			[userId],
			function(err, result){
				connection.release();
				
				if(err) return done(err);

				// now we make a path for them in the file system
				fs.mkdir(PATH+result.insertId, function(err){
					if(err) return done(err);

					//now make a path for the pictures, videos and styles
					fs.mkdir(PATH+result.insertId+"/pictures", function(err){
						if(err) return done(err);
					})
					fs.mkdir(PATH+result.insertId+"/videos", function(err){
						if(err) return done(err);
					})
					fs.mkdir(PATH+result.insertId+"/styles", function(err){
						if(err) return done(err);
					})
				}); 

				// load the profile into memory
				Profile.getProfile(userId, done);
			});
	});
}


// gets all styles associated with the profile id
Profile.getStyles = function(profileid, done){
	db.get(db.READ, function(err, connection){
		if(err) throw err;

		// get all the style_id's related to the profile 
		connection.query('SELECT * FROM profile_styles where profile_id =?',
			[profileid],
			function(err, result){
				connection.release();

				if(err) done(err);

				// now asyncronously load each style and return to the callback when done
				async.map(result, Profile.loadStyle, done);
			}
		);
	});
}


// loads a single style from a profile_style table row and returns it to the callback
Profile.loadStyle = function(profileStyle, done){
	db.get(db.READ, function(err, connection){
		if(err) done(err);
		
		// get the style we found in profileStyle
		connection.query('SELECT * FROM premium_styles where premium_style_id = ?',
			profileStyle.premium_style_id,
			function(err, result){
				connection.release();

				// return the constructed style to the callback
				return done(err, new Style(result[0].premium_style_id, 
										   result[0].style_path));
			}
		);
	});
}


// gets all the pictures assoicated with the profile id
Profile.getPictures = function(profileid, done){
	db.get(db.READ, function(err, connection){
		if(err) done(err);

		// get all the pictures assoicated with the profile
		connection.query('SELECT * FROM pictures where profile_id =?',
			[profileid], 
			function(err, result){
				connection.release();

				if(err) return done(err);

				// load the pictures and return to the callback when done
				return Profile.loadPictures(result, done);
			})
	})
}


// load each picture into memory and return the constructed array to the callback
Profile.loadPictures = function(pictures, done){
	var temp = []; // we'll add our picture objects here
	for(var i = 0 ; i < pictures.length; i++){ // for each picture
		temp[i] = new Picture(pictures[i].picture_id, // create a new picture object and add to picture array
							  pictures[i].profile_id, 
							  pictures[i].picture_path, 
							  pictures[i].size, 
							  pictures[i].resolution, 
							  pictures[i].style_id, 
							  pictures[i].premium_style_id, 
							  pictures[i].date_created);
	}

	// return the newly constructed picture array to the callback
	return done(null, temp);
}


// gets all the videos assoicated with the profile id
Profile.getVideos = function(profileid, done){
	db.get(db.READ, function(err, connection){
		if(err) return done(err);

		// get all the videos associated with the profile
		connection.query('SELECT * FROM videos where profile_id =?',
			[profileid],
			function(err, result){
				connection.release();

				if(err) return done(err);

				// load the videoes and return to the callback when done 
				return Profile.loadVideos(result, done);
			});
	});
}


// load each video into memory and return the constructed array to the callback
Profile.loadVideos = function(videos, done){
	var temp = []; // we'll add our videos here
	for(var i = 0 ; i < videos.length; i++){ // for each video
		temp[i] = new Video(videos[i].video_id, // create a new video object and add to array
							videos[i].profile_id, 
							videos[i].video_path, 
							videos[i].video_legth, 
							videos[i].style_id, 
							videos[i].premium_style_id, 
							videos[i].date_created);
	}

	//return the constructed videos array to the callback
	return done(null, temp);
}


// save a premium style in asp database
Profile.saveStyle = function(profileid, style, done){
	db.get(db.WRITE, function(err, connection){
		if(err) done(err);

		// first we make a async call to save the style
		connection.query('insert into premium_styles(style_path) values(?)',
			[style.stylePath],
			function(err, result){
				if (err) return done(err);

				// now we save the profile_style relationship
				connection.query('insert into profile_styles values(? ,?)',
					{
						profile_id : profileid, 
						premium_style_id : result[0].styleid
					},
					function(err, result){
						connection.release();
						//TODO save the style to the file system

						// ok we're done so return the the callback
						return done(err, result);
					}
				);	
			}
		);
		
	});
}

// save the picture in asp database
Profile.savePicture = function(picture, done){
	db.get(db.WRITE, function(err, connection){
		if (err) return done(err);

		// insert the picture into the picture table
		connection.query('insert into pictures(profile_id, picture_path, size, resolution, style_id, premium_style_id, date_created)' 
			+' values(?, ?, ?, ?, ?, ?, ?)',
			{
				profile_id   	 : picture.profileid,
				picture_path 	 : picture.picturePath,
				size 		 	 : picture.size,
				resolution   	 : picture.resolution,
				style_id     	 : picture.styleid,
				premium_style_id : picture.psid,
				date_created     : picture.dateCreated

			},
			function(err, result){
				connection.release();

				if (err) return done(err);
				// we saved the picture to the database now we need to write the picture to the file style
				// TODO write the picture to file system

				// lets update our picture object with a picture_id and return it
				picture.pictureid = result[0].picture_id;

				// return the saved picture to the callback
				return done(err, picture);
			}
		);
	});	
}


// save a video to the asp database
Profile.saveVideo = function(video, done){
	db.get(db.WRITE, function(err, connection){
		if (err) return done(err);

		// insert the video into the video table
		connection.query('insert into videos(profile_id, video_path, video_legth, style_id, premium_style_id, date_created)'
			+' values(?, ?, ?, ?, ?, ?)',
			{
				profile_id		 : video.profileid,
				video_path       : video.videoPath,
				video_legth      : video.videoLength,
				style_id 		 : video.styleid,
				premium_style_id : video.psid,
				date_created	 : video.dateCreated
			},
			function(err, result){
				connection.release();

				if(err) return done(err);

				//TODO write the video to the file system

				//update our video object with the video id
				videos.videoid = result[0].video_id;
				return done(err, video); // return the saved video to the callback
			}
		);
	});	
}


// gets all the styles in the styles table
// which is the default styles for all users
Profile.getDefaultStyles = function(done){
	db.get(db.READ, function(err, connection){
		if(err) return done(err);

		// get all the styles in the style table
		connection.query('SELECT * FROM styles', function(err, result){
			connection.release();
			
			if(err) done(err);

			var styles = []; // we'll be returning this to the callback 
			result.forEach(function(style){
				styles.push(new Style(style.style_id, style.style_path));
			});

			return done(err, styles);
		});
	})
}


module.exports = Profile;