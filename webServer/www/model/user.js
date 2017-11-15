/** user.js **/
var db = require('../db.js');
var bcrypt = require('bcrypt-nodejs');
var Profile = require('./profile');

// constructor
function User(userId,username , email, password , dob, firstname, lastname, subId){
		this.userid = userId;
		this.username = username;
		this.email = email;
		this.password = password;
		this.dob = dob;
		this.firstname = firstname;
		this.lastname = lastname;
		this.subId = subId;
}


// gets the user by user_id
User.findById = function(userId, done){
	db.get(db.READ, function(err,connection) {
		if (err) return done(err);
		connection.query('SELECT * FROM users WHERE user_id = ?'
				, [userId]
				, function(err, result){
					if (err) done(err);	
					if (!result) done('invalid user_id', null);
					done(null, new User(result[0].user_id,
										result[0].username,
								  	  	result[0].email_address,
								  	  	result[0].password,
								  	    result[0].dob,
								   	    result[0].fname,
								  	    result[0].lname,
								  	    result[0].subscription_id
					));
				}
		);
	});

}


//gets the user by username
User.findByUsername = function(username, done){
	db.get(db.READ, function(err,connection) {
		if (err) return done(err);

		connection.query('SELECT * FROM users WHERE username = ?'
				, [username]
				, function(err, result){
					if (err) return done(err); //just return the error if there is one	
					if (result.length === 0) return done(null, false, 'invalid username');
					
					var newUser = new User(result[0].user_id,
									       result[0].username,
								  	       result[0].email_address,
								           result[0].password,
								  	       result[0].dob,
								   	       result[0].fname,
								  	       result[0].lname,
								  	       result[0].subscription_id);

					return done(null, newUser);
				 }
		);
	});

}

User.prototype.setUsername = function(username){
	this.username = username;
}

// save the current user to the database
User.prototype.save = function(done){

	//first lets save our values to an array
	var userOptions = [
		this.username,
		this.email,
		this.password,
		this.dob,
		this.firstname,
		this.lastname,
		this.subId
	];

	db.get(db.WRITE, function(err, connection){
		if(err) return done(err);

		connection.query('INSERT INTO users (username, email_address, password, dob, fname, lname, subscription_id)'
			+' VALUES (?,?,?,?,?,?,?)',
			userOptions,
			function(err, result){
				if(err) return done(err);

				//make sure to create the profile
				Profile.createProfile(result.insertId, function(err){
					if(err) return done(err);

					//return the userid with no errors
					return done(null, result.insertId);
				});

				
			}
		);
	});
}

// checking if password is valid
User.prototype.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}


// generating a hash
User.prototype.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


User.prototype.toString = function() {
	// return ${this.userid} | ${this.username} | ${this.email} | ${this.dob} | ${this.firstname} | ${this.lastname};
	return this.userid;
}


User.prototype.print = function() {
		console.log(this.toString());
}

//export user to the application
module.exports = User;
