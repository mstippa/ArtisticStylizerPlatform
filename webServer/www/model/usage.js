/*******************
* 	usage.js
*******************/
var db      = require('../db.js');
var async   = require('async');

/**
* Gets all the usages with a sort
**/
Usage.getUsages = function(sortBy, done){
	db.get(db.READ, function(err, connection){
		if(err) return done(err);

		// get all the usages and order them by what the user wants
		connection.query('SELECT * FROM usages ORDER BY ?',
		 [sortBy], 
		 function(err, result){
			connection.release();
			
			if(err) done(err);

			return done(err, result);
		});
	});
}


/**
* Gets all the usages with default sort
**/
Usage.getUsages = function(done){
	db.get(db.READ, function(err, connection){
		if(err) return done(err);

		// get all the usages and order them by what the user wants
		connection.query('SELECT * FROM usages',
		 function(err, result){
			connection.release();
			
			if(err) done(err);

			return done(err, result);
		});
	});
}

/**
*	INPUT:
		start_time       - The time the process was started
		end_time         - The time the process ended
		content_size     - The size in bytes of the imgage being styled
		profile_id       - The ProfileID of the user doing the style transfer
		style_id         - The style that is to be transfered (NULL if premium_style_id is used)
		premium_style_id - The premium Style that is to be transferred (NULL if style_id is used)
		content_path     - The path to the completed styled imgage  
**/
Usage.saveUseage = function(start_time, end_time, content_size, profile_id, style_id, premium_style_id, content_path, done){
	db.get(db.WRITE, function(err, connection){
		if(err) return done(err);

		// insert the new usage into our db
		connection.query('insert into usages(process_time, content_size, profile_id, style_id, premium_style_id, content_path)'
			+' values(?,?,?,?,?,?)',
			{
				process_time	 : process_time,
				content_size     : content_size,
				profile_id       : profile_id,
				style_id 		 : style_id,
				premium_style_id : premium_style_id,
				content_path	 : content_path
			}, function(err, savedUsage){
				connection.release();

				if(err) done(err);

				// return the saved usage, which will now have a useage id
				return done(err, savedUsage);
			})

	}
}
module.exports = Usage;