/** user.js **/
var db = require('../db.js');

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


User.prototype.getUser = function(userId, done){
		db.get(db.READ, function(err,connection) {
			if (err) return done(err);

			connection.query('SELECT * FROM users WHERE user_id = ?'
							, userId
							, function(err, result){
								if (err) done(err);	
								if (!result) done('Invalid User');
								done(null, new User(result[0].user_id
												  , result[0].username
											  	  , result[0].email_address
											  	  , result[0].password
											  	  , result[0].dob
											   	  , result[0].fname
											  	  , result[0].lname
											  	  , result[0].subscription_id
								));
			});
		});

}

User.prototype.getUserByName = function(username, done){
	db.get(db.READ, function(err, connection)) {
		if (err) return done(err);
		connection.query()
	}
}

User.prototype.toString = function() {
	// return ${this.userid} | ${this.username} | ${this.email} | ${this.dob} | ${this.firstname} | ${this.lastname};
	return this.userid;
}

User.prototype.print = function() {
		console.log(this.toString());
	}

module.exports = User;
