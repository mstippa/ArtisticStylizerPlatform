//load all things we need
var LocalStrategy	= require('passport-local').Strategy;

var User 			= require('../model/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(userid, done) {

        return done(null, userid);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        User.findByUsername(user.username, function(err, user) {
            return done(err, user);
        });
    });

     // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy(
    	{
    		usernameField : 'username',
    		passwordField : 'password',
    		passReqToCallback : true // allows us to pass back the entire request to the callback
    	},
    	function(req, username, password, done) {


    	//asynchornous
    	process.nextTick(function(){
    		// find a user whose email is the same as the forms email
        	// we are checking to see if the user trying to login already exists
        	User.findByUsername(username, function(err, user) {
            	console.log("user : ",user);
                var createUser = req.body
                // if there are any errors, return the error
            	if (err)
                	return done(err);


            	// check to see if theres already a user with that username
            	if (user) {
                   return done(null, false,req.flash('signupMessage', 'That username is already taken.'));
            	} else {
            		// no user with that username, lets create one
            		// create the user
                   

            		var newUser = new User();

            		// set the user's local credentials

            		newUser.setUsername(username);
            		newUser.password = newUser.generateHash(password);
                    newUser.email = createUser.email;
                    newUser.firstname = createUser.fname;
                    newUser.lastname = createUser.lname;

            		newUser.save(function(err){
            			if(err)
            				throw err;
            			return done(null, newUser);
            		});
            	}
    		});
    	});
  	}));

	// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
    	},
    	function(req, username, password, done) { // callback with email and password from our form

        	// find a user whose email is the same as the forms email
        	// we are checking to see if the user trying to login already exists
        	User.findByUsername(username, function(err, user) {
            	if (err)
                    return done(err);

            	// if no user is found, return the err
            	if (!user)
                	return done(null, false, req.flash('loginMessage', 'That username doesnt exist.')); 

            	// if the user is found but the password is wrong
            	if (!user.validPassword(password))
                	return done(null, false, req.flash('loginMessage', 'Incorrect password')); // create the loginMessage and save it to session as flashdata

            	// all is well, return successful user
            	return done(null, user);
        	});

    	}
    ));

};


