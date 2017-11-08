/*******************
* profile.js
*******************/
var db      = require('../db.js');
var Picture = require('./picture.js');
var Video   = require('./video.js');
var Style   = require('./style.js');
var async   = require('async');

function Profile(userId, profileId){
	this.userid       = 	userId;
	this.profileid    = 	profileId;
	this.styles		  = 	null;
	this.pictures     =     null;
	this.videoes	  =	    null;
	this.transactions =     null;
	this.payments     =     null;
	this.subscription =     null;
}

Profile.getProfile = function(userId, done){
	db.get(db.READ, function(err,connection) {
		if (err) return done(err);
		connection.query('SELECT * FROM profiles WHERE user_id = ?',
				[userId],
				function(err, result){
					if (err) return done (err);
					if (!result) return("no profile for that user", null);
					
					console.log("result: ", result, "result[0]: ", result[0].profile_id);
					// load the profile data
					profile = new Profile(result[0].user_id, result[0].profile_id);
					Profile.getStyles(profile.profileid, function(err, styles){
						if (err) done(err);

						profile.styles = styles;
						Profile.getVideos(profile.profileid,function(err, videos){
							if (err) done(err);

							profile.videoes = videos; 
							Profile.getPictures(profile.profileid,function(err, pictures){
								if (err) done(err);

								profile.pictures = pictures;

								// testing
								console.log("profile: ", profile);

								return done(null, profile);
							});
						});
					});
			}
		)
	});
}

Profile.createProfile = function(userId, done){
	db.get(db.WRITE, function(err, connection){
		if(err) return done(err);
		connection.query('INSERT INTO profiles(user_id) VALUES (?)',
			[userId],
			function(err, result){
				if(err) return done(err);

				Profile.getProfile(userId, done); // load the profile into memory
			});
	});
}

// gets all styles associated with the profile id
Profile.getStyles = function(profileid, done){
	db.get(db.READ, function(err, connection){
		if(err) throw err;
		connection.query('SELECT * FROM profile_styles where profile_id =?',
			[profileid],
			function(err, result){
				if(err) done(err);

				// aync map the styles to get each style
				async.map(result, Profile.loadStyle, done);
			}
		);
	});
}

// loads a single style
Profile.loadStyle = function(style, done){
	db.get(db.READ, function(err, connection){
		if(err) done(err);
		
		var style_id = style.premium_style_id;

		connection.query('SELECT * FROM premium_styles where premium_style_id = ?',
			style_id,
			function(err, result){
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
		connection.query('SELECT * FROM pictures where profile_id =?',
			[profileid], 
			function(err, result){
				if(err) throw err;

				return Profile.loadPictures(result, done);
			})
	})
}

// load each picture into memory
Profile.loadPictures = function(pictures, done){
	var temp = [];
	for(var i = 0 ; i < pictures.length; i++){
		temp[i] = new Picture(pictures[i].picture_id,
			pictures[i].profile_id, 
			pictures[i].picture_path, 
			pictures[i].size, 
			pictures[i].resolution, 
			pictures[i].style_id, 
			pictures[i].premium_style_id, 
			pictures[i].date_created);
	}
	return done(null, temp);
}

// gets all the videos assoicated with the profile id
Profile.getVideos = function(profileid, done){
	db.get(db.READ, function(err, connection){
		if(err) done(err);
		connection.query('SELECT * FROM videos where profile_id =?',
			[profileid],
			function(err, result){
				if(err) done(err);

				// return the videoes
				return Profile.loadVideos(result, done);
			})
	})
}


// load each video into memory
Profile.loadVideos = function(videos, done){
	var temp = [];
	for(var i = 0 ; i < videos.length; i++){
		temp[i] = new Video(videos[i].video_id, 
			videos[i].profile_id, 
			videos[i].video_path, 
			videos[i].video_legth, 
			videos[i].style_id, 
			videos[i].premium_style_id, 
			videos[i].date_created);
	}
	return done(null, temp);
}
module.exports = Profile;